import { EnrichedPipeline, getDailyPipelines } from '~/services/circle-ci';
import { addDays } from 'date-fns';
import { getLatestTestResults } from '~/services/test-results';

export const fetchRawCircleCiData = async (useMock = false): Promise<EnrichedPipeline[]> => {
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

  return getDailyPipelines('next-release', addDays(new Date(), -30));
};

export const getProcessedTestResults = async (pipelines: EnrichedPipeline[]) => {
  console.log('Transforming circle ci data to our own data model.');
  const testResults = await getLatestTestResults({
    getDailyPipelines: async () => pipelines,
    now: () => new Date(),
  });

  return testResults;
};

export const fetchCircleCiData = async () => {
  const pipelines = await fetchRawCircleCiData();

  return getProcessedTestResults(pipelines);
};
