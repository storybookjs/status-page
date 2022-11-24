import { writeFile } from 'node:fs/promises';
import { getDailyPipelines } from '../app/services/circle-ci';
import { addDays } from 'date-fns';
import { format } from 'prettier';

(async () => {
  const pipelines = await getDailyPipelines('next', addDays(new Date(), -90));

  console.log('Applying prettier on downloaded data');
  const pretty = format(JSON.stringify(pipelines), { parser: 'json' });

  console.log('Writing data to ./app/mock/data.json');
  await writeFile('./app/mock/data.json', pretty);
})();
