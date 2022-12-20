import { addDays } from 'date-fns';

import { TemplateTests, TestResult } from '~/model/types';
import { startOfDay } from 'date-fns';
import { range } from '~/util/index';

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
}: {
  name?: string;
  lastStatus?: TestResult['status'];
}) => {
  return satisfies<TemplateTests>()({
    id: 'foo',
    name,
    results: range(0, 90)
      .map(() => testResult)
      .map((res, index) => {
        const status =
          index === 89
            ? lastStatus
            : index < 10
            ? 'no-data'
            : index % 30 === 0
            ? 'failure'
            : index % 32 === 0
            ? 'indecisive'
            : ('success' as const);
        return {
          ...res,
          features:
            status === 'failure'
              ? [
                  { category: 'addon', name: 'addon docs', status: 'failure' },
                  { category: 'addon', name: 'addon controls', status: 'failure' },
                ]
              : [],
          date: addDays(startOfDay(TODAY), -(89 - index)),
          // just to have predictable but different data
          status,
        };
      }),
  });
};

/**
 * Mimicking the satisfies operator until we can upgrade to TS4.9
 */
export function satisfies<A>() {
  return <T extends A>(x: T) => x;
}
