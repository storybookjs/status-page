import { writeFile } from 'node:fs/promises';
import { format } from 'prettier';
import { parseArgs } from 'node:util';
import { fetchRawCircleCiData, getProcessedTestResults } from '../client/fetch-circle-ci-data';

(async () => {
  const args = parseArgs({
    options: {
      useMock: { type: 'boolean', default: false },
      storeCircleCI: { type: 'boolean', default: false },
      branch: { type: 'string', default: 'next-release' },
    },
  });

  const { useMock, storeCircleCI, branch } = args.values;

  const pipelines = await fetchRawCircleCiData({ useMock, branch });

  if (storeCircleCI) {
    console.log('Writing data to ./mock/data.json');
    await writeFile('./mock/data.json', JSON.stringify(pipelines, null, 2));
  }

  const testResults = await getProcessedTestResults(pipelines);

  console.log('Applying prettier on transformed data');
  // TODO: Does this really need prettier? or just define identation of 2 in stringify?
  const prettyTestResults = format(JSON.stringify(testResults), { parser: 'json' });

  const templatePath = './mock/template-tests.json';
  await writeFile(templatePath, prettyTestResults);
  console.log(`Mock data written to ${templatePath}`);
})();
