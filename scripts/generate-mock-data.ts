import { readFile, writeFile } from 'node:fs/promises';
import { EnrichedPipeline, getDailyPipelines } from '../app/services/circle-ci';
import { addDays } from 'date-fns';
import { format } from 'prettier';
import { getLatestTestResults } from '../app/services/test-results';
import { parseArgs } from 'node:util';

(async () => {
  const args = parseArgs({ options: { useMock: { type: 'boolean', default: false } } });

  let pipelines: EnrichedPipeline[];

  if (!args.values.useMock) {
    pipelines = await getDailyPipelines('next', addDays(new Date(), -90));

    console.log('Applying prettier on downloaded data');
    const prettyPipelines = format(JSON.stringify(pipelines), { parser: 'json' });

    console.log('Writing data to ./app/mock/data.json');
    await writeFile('./app/mock/data.json', prettyPipelines);
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
