import { EnrichedPipeline, getDailyPipelines } from './circle-ci';
import { Feature, TemplateConfig, TemplateTests, TestResult } from '../model/types';
import { range } from '../util';
import { addDays, isSameDay } from 'date-fns';
import { AMOUNT_OF_DAYS_TO_FETCH } from '~/client/constants';

interface Context {
  getDailyPipelines: typeof getDailyPipelines;
  now: () => Date;
}

const testResultJobsNames = [
  'test-runner-production',
  'e2e-production',
  // These job names got renamed, but we need to maintain them for some time to keep the data consistent
  'test-runner-sandboxes',
  'e2e-sandboxes',
];

export async function getLatestTestResults(ctx: Context): Promise<TemplateTests[]> {
  const pipelines: EnrichedPipeline[] = await ctx.getDailyPipelines('next');
  const now = ctx.now();

  const last90Days = range(0, AMOUNT_OF_DAYS_TO_FETCH).map((i) => addDays(now, -AMOUNT_OF_DAYS_TO_FETCH + i));
  const days = last90Days.map((day) => enrichDayWithData(day, pipelines));
  const allTemplates = Array.from(new Set(days.map((it) => it.templates?.map((it) => it.template).flat() ?? []).flat()));

  return allTemplates.map((template) => ({
    id: template,
    name: template,
    config: getLatestTemplateConfig(days, template),
    results: days.map((day) => getTestResultFromDay(day, template)),
  }));
}

function getCiLink(pipeline?: EnrichedPipeline): string | undefined {
  return pipeline != null ? `https://app.circleci.com/pipelines/github/storybookjs/storybook/${pipeline.number}` : undefined;
}

function getTestResultFromDay(enrichedDay: ReturnType<typeof enrichDayWithData>, template: string): TestResult {
  const ciLink = getCiLink(enrichedDay.pipeline);
  if (enrichedDay.status === 'incomplete') return { status: 'no-data', date: enrichedDay.date, ciLink };

  const templateResult = enrichedDay.templates.find((it) => it.template === template);
  if (templateResult == null || ciLink == null) return { status: 'no-data', date: enrichedDay.date };

  const config = getTemplateConfig(enrichedDay.pipeline, template);

  const features = templateResult.features;
  return {
    date: enrichedDay.date,
    ciLink,
    storybookVersion: config?.version,
    features: features,
    status: getStatusOfTestResult(features),
  };
}

/**
 * Get the latest template configuration from all pipelines.
 */
function getLatestTemplateConfig(enrichedDays: ReturnType<typeof enrichDayWithData>[], template: string): TemplateConfig | undefined {
  for (const { pipeline } of [...enrichedDays].reverse()) {
    if (pipeline != null) {
      const config = getTemplateConfig(pipeline, template);
      if (config != null) {
        return config;
      }
    }
  }
}

function getTemplateConfig(pipeline: EnrichedPipeline, template: string): TemplateConfig | undefined {
  const buildJob = pipeline.jobs.find((it) => it.name === 'build-sandboxes');
  if (buildJob == null) return;
  const metaDataTest = buildJob.tests.find((it) => it.name.includes(`${template} - metadata`));
  if (metaDataTest == null) return;
  return JSON.parse(metaDataTest.message);
}

function enrichDayWithData(date: Date, pipelines: EnrichedPipeline[]) {
  const pipeline = pipelines.find((it) => isSameDay(new Date(it.created_at), date));
  if (pipeline == null) return { status: 'incomplete' as const, date };

  const templateNames = getAllTemplatesNames(pipeline);
  const isCompleted = isPipelineCompleted(pipeline);
  if (templateNames == null || !isCompleted) return { pipeline, status: 'incomplete' as const, date };

  const tests = getRelevantTests(pipeline, templateNames);

  return {
    status: 'complete' as const,
    date,
    pipeline,
    templates: templateNames.map((template) => ({ template, date, features: getFeaturesOfTemplate(template, tests) })),
  };
}

function getStatusOfTestResult(features: Feature[]): TestResult['status'] {
  if (features.length === 0) return 'indecisive';
  if (features.every((it) => ['success', 'unsupported'].includes(it.status))) {
    return 'success';
  }
  if (features.some((it) => it.status === 'indecisive')) {
    return 'indecisive';
  }
  return 'failure';
}

function getFeaturesOfTemplate(name: string, tests: ReturnType<typeof getRelevantTests>): Feature[] {
  const features = Array.from(new Set(tests.map((it) => it.feature)));
  const templateTests = tests.filter((test) => test.template === name);

  return features.map((feature) => ({
    category: feature.includes('addon') ? 'addon' : 'core',
    name: feature,
    status: getStatusOfFeature(feature, templateTests),
  }));
}

function getStatusOfFeature(feature: string, tests: ReturnType<typeof getRelevantTests>): Feature['status'] {
  // system-err tests are filled with metadata
  const featureTests = tests.filter((it) => it.feature === feature && it.result !== 'system-err');
  if (featureTests.length === 0) return 'unsupported';
  if (featureTests.every((it) => it.result === 'success' || it.result === 'system-out')) return 'success';
  if (featureTests.some((it) => it.result === 'system-out')) {
    console.log(`Found flaky tests in feature ${feature} for ${tests[0]?.template} (${tests[0]?.date})`);
  }

  if (featureTests.some((it) => it.result === 'failure')) return 'failure';
  if (featureTests.some((it) => it.result === 'skipped')) {
    console.log(`Marked feature ${feature} for ${tests[0]?.template} as unsupported (${tests[0]?.date})`);
    return 'unsupported';
  }

  console.log(`Marked feature ${feature} for ${tests[0]?.template} as indecisive (${tests[0]?.date})`);
  console.log(featureTests.filter((it) => !['success', 'failure', 'skipped'].includes(it.result)));
  return 'indecisive';
}

function getRelevantTests(pipeline: EnrichedPipeline, templates: string[]) {
  return testResultJobsNames
    .map((name) => {
      const job = pipeline.jobs.find((job) => job.name === name);
      return (
        job?.tests
          // TODO: Find a way how to treat Framework specific tests here:
          .filter((it) => !it.classname.includes('Next.js'))
          .map((test) => ({
            ...test,
            job: job.name,
            result: test.result,
            template: templates.find((name) => test.classname.includes(name)),
            feature: getFeature(job.name, test.classname),
            date: pipeline.created_at,
          })) ?? []
      );
    })
    .flat();
}

function getFeature(jobName: string, className: string) {
  if (jobName === 'e2e-sandboxes' || jobName === 'e2e-production') {
    const feature = className.split(' › ')[2];
    if (feature == null) return 'core';

    if (feature.includes('addon')) {
      if (className.includes('source snippet')) return `${feature}/source-snippets`;
      return feature;
    }
    return 'core';
  }
  if (jobName === 'test-runner-sandboxes' || jobName === 'test-runner-production') {
    const feature = className.split(' ')[1];
    if (feature.includes('addons/')) return `addon-${feature.split('/')[1]}`;
    return 'core';
  }
  return 'core';
}

function getAllTemplatesNames(pipeline: EnrichedPipeline) {
  const buildJob = pipeline.jobs.find((it) => it.name === 'build-sandboxes');
  if (buildJob == null) return;
  return buildJob.tests.map((test) => test.name.split(' - ')[1]);
}

function isPipelineCompleted(pipeline: EnrichedPipeline) {
  const testResultsJobs = testResultJobsNames.map((name) => pipeline.jobs.find((it) => it.name === name)).filter(Boolean);
  return testResultsJobs.every((it) => it?.status === 'success' || it?.status === 'failed');
}
