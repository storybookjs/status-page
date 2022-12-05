import { EnrichedPipeline, getDailyPipelines } from './circle-ci';
import { Feature, TemplateTests, TestResult } from '../model/types';
import { range } from '../util';
import { addDays, isSameDay } from 'date-fns';

interface Context {
  getDailyPipelines: typeof getDailyPipelines;
  now: () => Date;
}

const testResultJobsNames = ['e2e-sandboxes', 'test-runner-sandboxes'];

export async function getLatestTestResults(ctx: Context): Promise<TemplateTests[]> {
  const pipelines: EnrichedPipeline[] = await ctx.getDailyPipelines('next');
  const now = ctx.now();

  const last90Days = range(0, 90).map((i) => addDays(now, -90 + i));
  const days = last90Days.map((day) => enrichDayWithData(day, pipelines));
  const allTemplates = Array.from(new Set(days.map((it) => it.templates?.map((it) => it.template).flat() ?? []).flat()));

  return allTemplates.map((template) => ({
    id: template,
    name: template,
    results: days.map((day) => getTestResultFromDay(day, template)),
  }));
}

function getTestResultFromDay(enrichedDay: ReturnType<typeof enrichDayWithData>, template: string): TestResult {
  if (enrichedDay.status === 'incomplete') return { status: 'no-data', date: enrichedDay.date };

  const templateResult = enrichedDay.templates.find((it) => it.template === template);
  if (templateResult == null) return { status: 'no-data', date: enrichedDay.date };

  const features = templateResult.features;
  return {
    date: enrichedDay.date,
    ciLink: `https://app.circleci.com/pipelines/github/storybookjs/storybook/${enrichedDay.pipeline.number}`,
    storybookVersion: 'TODO',
    features: features,
    status: getStatusOfTestResult(features),
  };
}

function enrichDayWithData(date: Date, pipelines: EnrichedPipeline[]) {
  const pipeline = pipelines.find((it) => isSameDay(new Date(it.created_at), date));
  if (pipeline == null) return { status: 'incomplete' as const, date };

  const templateNames = getAllTemplatesNames(pipeline);
  const isCompleted = isPipelineCompleted(pipeline);
  if (templateNames == null || !isCompleted) return { status: 'incomplete' as const, date };

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
  const featureTests = tests.filter((it) => it.feature === feature);
  if (featureTests.length === 0) return 'unsupported';
  if (featureTests.every((it) => it.result === 'success')) return 'success';
  // TODO find out why we have system-out results
  if (featureTests.some((it) => it.result === 'failure' || it.result === 'skipped' || it.result === 'system-out')) return 'failure';
  return 'indecisive';
}

function getRelevantTests(pipeline: EnrichedPipeline, templates: string[]) {
  return testResultJobsNames
    .map((name) => {
      const job = pipeline.jobs.find((job) => job.name === name);
      return (
        job?.tests.map((test) => ({
          job: job.name,
          result: test.result,
          template: templates.find((name) => test.classname.includes(name)),
          feature: getFeature(job.name, test.classname),
        })) ?? []
      );
    })
    .flat();
}

function getFeature(jobName: string, className: string) {
  if (jobName === 'e2e-sandboxes') {
    const feature = className.split(' › ')[2];
    if (feature == null) return 'core';
    if (feature.includes('addon')) return feature;
    return 'core';
  }
  if (jobName === 'test-runner-sandboxes') {
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
  const testResultsJobs = testResultJobsNames.map((name) => pipeline.jobs.find((it) => it.name === name));
  return testResultsJobs.every((it) => it?.status === 'success' || it?.status === 'failed');
}
