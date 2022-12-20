import { addDays } from 'date-fns';
import { getJobs, getPipelines, getTestData, getWorkflows, Pipeline } from 'client/circle-ci';

export async function getDailyPipelines(branch = 'next-release', since?: Date): Promise<EnrichedPipeline[]> {
  async function getNextPageRecursively(
    pipelines: Pipeline[] = [],
    enrichedPipelines: Promise<EnrichedPipeline>[] = [],
    pageToken?: string | undefined
  ): Promise<EnrichedPipeline[]> {
    const createdAt = new Date(pipelines[pipelines.length - 1]?.created_at ?? new Date().getTime());
    if (createdAt < (since ?? addDays(new Date(), -90))) {
      return await Promise.all(enrichedPipelines);
    }

    const nextPipelines = await getPipelines({
      'project-slug': 'gh/storybookjs/storybook',
      branch,
      'page-token': pageToken,
    });
    const scheduledPipelines = nextPipelines.data.items.filter((pipeline) => pipeline.trigger.type === 'scheduled_pipeline');
    const newEnrichedPipelines = scheduledPipelines.map(enrichPipeline);

    return getNextPageRecursively(
      [...pipelines, ...nextPipelines.data.items],
      [...enrichedPipelines, ...newEnrichedPipelines],
      nextPipelines.data.next_page_token
    );
  }

  return await getNextPageRecursively();
}

export type EnrichedPipeline = Awaited<ReturnType<typeof enrichPipeline>>;

async function enrichPipeline(pipeline: Pipeline) {
  const workflows = await getWorkflows({ 'pipeline-id': pipeline.id });
  const firstWorkflow = workflows.data.items[0];
  const jobs =
    firstWorkflow != null ? await getJobs({ id: firstWorkflow?.id }).then((it) => it.data.items.filter((it) => it.job_number != null)) : [];
  const enrichedJobs = await Promise.all(
    jobs.map(async (job) => {
      const tests = await getTestData({
        'project-slug': 'gh/storybookjs/storybook',
        'job-number': job.job_number as any, // wrong definition in open-api
      });
      return { ...job, tests: tests.data.items };
    })
  );

  return { ...pipeline, workflows: workflows.data.items, jobs: enrichedJobs };
}
