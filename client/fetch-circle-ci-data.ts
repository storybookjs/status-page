import { EnrichedPipeline, getDailyPipelines } from '~/services/circle-ci';
import { addDays } from 'date-fns';
import { getLatestTestResults } from '~/services/test-results';
import { StorybookNpmTag } from '~/model/types';

export const fetchRawCircleCiData = async ({ useMock = false, branch = 'next-release' } = {}): Promise<EnrichedPipeline[]> => {
  if (useMock) {
    console.log('Reading mock data');
    try {
      const path = '~/mock/data.json';
      return require(path);
    } catch (e) {
      console.error('Failed to retrieve data from mock/data.json. Please run "pnpm run generate-mock-data" to generate it.');
      return [];
    }
  }

  console.log(`Fetching data for the ${branch} branch`);
  return getDailyPipelines(branch, addDays(new Date(), -90));
};

export const getProcessedTestResults = async (pipelines: EnrichedPipeline[]) => {
  console.log('Transforming circle ci data to our own data model.');
  const testResults = await getLatestTestResults({
    getDailyPipelines: async () => pipelines,
    now: () => new Date(),
  });

  return testResults;
};

export const fetchCircleCiData = async ({ storybookNpmTag }: { storybookNpmTag: StorybookNpmTag }) => {
  // TODO: change to 'next-release' : 'main-release' once SB 7.0 is merged to main in the monorepo
  const branch = storybookNpmTag === 'next' ? 'next-release' : 'next-release';
  const pipelines = await fetchRawCircleCiData({ branch });

  return getProcessedTestResults(pipelines);
};
