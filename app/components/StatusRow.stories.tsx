import { addDays } from 'date-fns';
import { Meta, StoryObj } from '@storybook/react';

import { TemplateTests, TestResult } from '../model/types';
import { startOfDay } from 'date-fns';
import { StatusRow } from './StatusRow';

const viewports = {
  small: {
    name: '600px',
    styles: {
      width: '600px',
      height: '100%',
    },
  },
  medium: {
    name: '850px',
    styles: {
      width: '850px',
      height: '100%',
    },
  },
};

const meta = {
  component: StatusRow,
  parameters: {
    viewport: {
      viewports,
    },
  },
} as Meta<typeof StatusRow>;

export default meta;

type Story = StoryObj<typeof meta>;

const testResult: TestResult = {
  ciLink: 'http://app.circleci.com/pipelines/github/storybookjs/storybook/12345/workflows/12345',
  date: new Date(),
  features: [{ category: 'addons', name: 'addon-docs', status: 'success' }],
  status: 'success',
  storybookVersion: '7.0.0-alpha.51',
};

const createMock = (lastStatus: TestResult['status']): TemplateTests => {
  return {
    id: 'react-vite/default-ts',
    name: 'React Vite (Typescript)',
    results: new Array(90).fill(testResult).map((res, index) => ({
      ...res,
      date: addDays(startOfDay(new Date()), -(90 + index)),
      // just to have predictable but different data
      status:
        index === 89 ? lastStatus : index < 10 ? 'no-data' : index % 30 === 0 ? 'failure' : index % 32 === 0 ? 'indecisive' : 'success',
    })),
  };
};

export const NinetyDayView: Story = {
  args: createMock('success'),
};

export const SixtyDayView: Story = {
  ...NinetyDayView,
  parameters: {
    viewport: {
      defaultViewport: 'medium',
    },
    chromatic: {
      viewports: [850],
    },
  },
};

export const ThirtyDayView: Story = {
  ...NinetyDayView,
  parameters: {
    viewport: {
      defaultViewport: 'small',
    },
    chromatic: {
      viewports: [600],
    },
  },
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
    results: createMock('indecisive').results.map((r, index) => ({ ...r, status: index === 89 ? 'success' : 'no-data' })),
  },
};
