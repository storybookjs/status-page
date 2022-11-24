import { Meta, StoryObj } from '@storybook/react';
import { TemplateTests, TestResult } from '../model/types';
import { StatusRow } from './StatusRow';

const meta = {
  component: StatusRow,
} as Meta<typeof StatusRow>;

export default meta;

type Story = StoryObj<typeof meta>;

const testResult: TestResult = {
  ciLink: 'http://google.com',
  date: new Date().toISOString().split('T')[0],
  features: [{ category: 'addon-docs', status: 'success' }],
  result: 'success',
  storybookVersion: '7.0.0-alpha.51',
};

const createMock = (lastResult: TestResult['result']): TemplateTests => {
  return {
    id: 'react-vite/default-ts',
    name: 'React Vite (Typescript)',
    results: new Array(90).fill(testResult).map((res, index) => ({
      ...res,
      date: new Date(new Date().setDate(new Date().getDate() - index)).toISOString().split('T')[0],
      // just to have predictable but different data
      result:
        index === 0
          ? lastResult
          : index > 80
          ? 'no-data'
          : index % 30 === 0
          ? 'failure'
          : index % 32 === 0
          ? 'indecisive'
          : 'success',
    })),
  };
};

export const Success: Story = {
  args: createMock('success'),
};

export const Failure: Story = {
  args: createMock('failure'),
};

export const Indecisive: Story = {
  args: createMock('indecisive'),
};

export const RecentlyAdded: Story = {
  args: {
    ...createMock('indecisive'),
    results: [testResult],
  },
};
