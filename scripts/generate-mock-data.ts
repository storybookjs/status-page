import { readFile, writeFile } from 'node:fs/promises';
import { EnrichedPipeline, getDailyPipelines } from '~/services/circle-ci';
import { addDays } from 'date-fns';
import { format } from 'prettier';
import { getLatestTestResults } from '~/services/test-results';
import { parseArgs } from 'node:util';

(async () => {
  const args = parseArgs({
    options: {
      useMock: { type: 'boolean', default: false },
      storeCircleCI: { type: 'boolean', default: false },
    },
  });

  let pipelines: EnrichedPipeline[];

  if (!args.values.useMock) {
    pipelines = await getDailyPipelines('next-release', addDays(new Date(), -30));

    console.log('Writing data to ./app/mock/data.json');
    if (args.values.storeCircleCI) {
      await writeFile('./app/mock/data.json', JSON.stringify(pipelines));
    }
  } else {
    console.log('Reading mock data');
    pipelines = await JSON.parse(await readFile('./app/mock/data.json', { encoding: 'utf-8' }));
  }

  console.log('Transforming circle ci data to our own data model.');
  const testResults = await getLatestTestResults({
    getDailyPipelines: async () => pipelines,
    now: () => new Date(),
  });

  console.log('Applying prettier on transformed data');
  const prettyTestResults = format(JSON.stringify(testResults), { parser: 'json' });

  await writeFile('./app/mock/template-tests.json', prettyTestResults);
})();
