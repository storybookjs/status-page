import { Meta, StoryObj } from '@storybook/react';

import { TestResult } from '~/model/types';
import { StatusInfo } from '~/components/StatusInfo';

const meta = {
  component: StatusInfo,
  decorators: [
    (Story) => (
      <div style={{ width: 750 }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof StatusInfo>;

export default meta;

type Story = StoryObj<typeof StatusInfo>;

const TODAY = new Date(1669383837565);
const testResult: TestResult = {
  ciLink: 'http://app.circleci.com/pipelines/github/storybookjs/storybook/12345/workflows/12345',
  date: TODAY,
  features: [
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
  ],
  status: 'success',
  storybookVersion: '7.0.0-alpha.51',
};

export const Success: Story = {
  args: {
    ...testResult,
  },
};

export const Failure: Story = {
  args: {
    ...testResult,
    status: 'failure',
    features: [...testResult.features, { category: 'core', name: 'core', status: 'failure' }],
  },
};

export const Indecisive: Story = {
  args: {
    ...testResult,
    status: 'indecisive',
    features: [],
  },
};

export const Unsupported: Story = {
  args: {
    ...testResult,
    features: [...testResult.features, { category: 'addon', name: 'addon controls', status: 'unsupported' }],
  },
};

export const NoData: Story = {
  args: {
    ...testResult,
    status: 'no-data',
  },
};
