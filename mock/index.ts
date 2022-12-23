import { addDays } from 'date-fns';

import { Feature, TemplateTests, TestResult } from '~/model/types';
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
  featureStatus,
}: {
  name?: string;
  lastStatus?: TestResult['status'];
  featureStatus?: Feature['status'];
}) => {
  return satisfies<TemplateTests>()({
    id: 'react-vite/default-ts',
    name,
    config: {
      name: 'React Vite (TS)',
      script: 'yarn create vite . --template react-ts',
      expected: {
        framework: '@storybook/react-vite',
        renderer: '@storybook/react',
        builder: '@storybook/builder-vite',
      },
      id: 'react-vite/default-ts',
      version: '7.0.0-beta.13',
    },
    results: range(0, 90)
      .map(() => testResult)
      .map((res, index) => {
        const status: TestResult['status'] =
          index === 89 ? lastStatus : index < 10 ? 'no-data' : index % 30 === 0 ? 'failure' : index % 32 === 0 ? 'indecisive' : 'success';
        return {
          ...res,
          features:
            status === 'indecisive' || status === 'no-data'
              ? []
              : [
                  { category: 'addon', name: 'addon-actions', status: 'success' },
                  {
                    category: 'addon',
                    name: 'addon-backgrounds',
                    status: 'success',
                  },
                  {
                    category: 'addon',
                    name: 'addon-controls',
                    status: 'success',
                  },
                  {
                    category: 'addon',
                    name: 'addon-docs/source-snippets',
                    status: 'success',
                  },
                  { category: 'addon', name: 'addon-docs', status: 'success' },
                  {
                    category: 'addon',
                    name: 'addon-interactions',
                    status: 'success',
                  },
                  {
                    category: 'addon',
                    name: 'addon-viewport',
                    status: 'success',
                  },
                  { category: 'core', name: 'core', status: featureStatus || status },
                ],
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
