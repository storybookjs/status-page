import { Meta, StoryObj } from '@storybook/react';

import { TestResult } from '~/model/types';
import { StatusInfo } from '~/components/StatusInfo';

const meta = {
  component: StatusInfo,
  decorators: [
    (Story) => (
      <div style={{ width: 350 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof StatusInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

const TODAY = new Date(1669383837565);
const testResult: TestResult = {
  ciLink: 'http://app.circleci.com/pipelines/github/storybookjs/storybook/12345/workflows/12345',
  date: TODAY,
  features: [
    { category: 'addons', name: 'addon docs', status: 'failure' },
    { category: 'addons', name: 'addon controls', status: 'failure' },
  ],
  status: 'failure',
  storybookVersion: '7.0.0-alpha.51',
};

export const Success: Story = {
  args: {
    ...testResult,
    status: 'success',
  },
};
export const Failure: Story = {
  args: testResult,
};
export const Indecisive: Story = {
  args: {
    ...testResult,
    status: 'indecisive',
  },
};
export const NoData: Story = {
  args: {
    ...testResult,
    status: 'no-data',
  },
};
