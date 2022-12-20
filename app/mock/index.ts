import { addDays } from 'date-fns';

import { Feature, TestResult } from "~/model/types";
import { startOfDay } from 'date-fns';
import { range } from '~/util';

const TODAY = new Date(1669383837565);
const testResult: Extract<TestResult, { status: 'success' | 'failure' | 'indecisive' }> = {
  ciLink: 'http://app.circleci.com/pipelines/github/storybookjs/storybook/12345/workflows/12345',
  date: TODAY,
  features: [],
  status: 'success',
  storybookVersion: '7.0.0-alpha.51',
};

export const createMock = ({
  name = 'React Vite (Typescript)',
  lastStatus = 'success',
  features = [],
}: {
  name?: string;
  lastStatus?: TestResult['status'];
  features?: Feature[];
}) => {
  return {
    id: 'foo',
    name,
    results: range(0, 90)
      .map(() => testResult)
      .map((res, index) => ({
        ...res,
        features,
        date: addDays(startOfDay(TODAY), -(89 - index)),
        // just to have predictable but different data
        status:
          index === 89 ? lastStatus : index < 10 ? 'no-data' : index % 30 === 0 ? 'failure' : index % 32 === 0 ? 'indecisive' : 'success',
      })),
  };
};
