import { paths } from '../open-api/circle-ci';
import { Fetcher } from 'openapi-typescript-fetch';

const fetcher = Fetcher.for<paths>();

let count = 0;

fetcher.configure({
  baseUrl: 'https://circleci.com/api/v2',
  use: [
    (url, init, next) =>
      retryPromise(async () => {
        const response = await next(url, init);
        console.log(`#${++count}: ${url} ${response.status} @ ${new Date().toISOString()}`);
        if (!response.ok) throw response;
        return response;
      }),
  ],
});

async function retryPromise<T>(fn: () => Promise<T>, retriesLeft = 10, interval = 200): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retriesLeft === 0) throw error;
    console.log(`Retrying in ${interval}ms ...`);
    await new Promise((res) => setTimeout(res, interval));
    return await retryPromise(fn, --retriesLeft, interval);
  }
}

export const getPipelines = fetcher.path('/project/{project-slug}/pipeline').method('get').create();
export const getWorkflows = fetcher.path('/pipeline/{pipeline-id}/workflow').method('get').create();
export const getJobs = fetcher.path('/workflow/{id}/job').method('get').create();
export const getTestData = fetcher.path('/project/{project-slug}/{job-number}/tests').method('get').create();

export type Pipeline = paths['/project/{project-slug}/pipeline']['get']['responses']['200']['content']['application/json']['items'][number];
