import { addDays } from 'date-fns';
import { Meta, StoryObj } from '@storybook/react';

import { TemplateTests, TestResult } from '../model/types';
import { startOfDay } from 'date-fns';
import { StatusRow } from './StatusRow';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
  decorators: [
    (Story) => (
      <div className="result-grid">
        <Story />
      </div>
    ),
  ],
  parameters: {
    viewport: {
      viewports,
    },
  },
  excludeStories: ['createMock'],
} as Meta<typeof StatusRow>;

export default meta;

type Story = StoryObj<typeof meta>;
type PlayFunction = Pick<Story, 'play'>['play'];

const TODAY = new Date(1669383837565);
const testResult: TestResult = {
  ciLink: 'http://app.circleci.com/pipelines/github/storybookjs/storybook/12345/workflows/12345',
  date: TODAY,
  features: [
    { category: 'addons', name: 'addon docs', status: 'failure' },
    { category: 'addons', name: 'addon controls', status: 'failure' },
  ],
  status: 'success',
  storybookVersion: '7.0.0-alpha.51',
};

export const createMock = ({
  name = 'React Vite (Typescript)',
  lastStatus = 'success',
}: {
  name?: string;
  lastStatus?: TestResult['status'];
}): TemplateTests => {
  return {
    id: 'foo',
    name,
    results: new Array(90).fill(testResult).map((res, index) => ({
      ...res,
      date: addDays(startOfDay(TODAY), -(89 - index)),
      // just to have predictable but different data
      status:
        index === 89 ? lastStatus : index < 10 ? 'no-data' : index % 30 === 0 ? 'failure' : index % 32 === 0 ? 'indecisive' : 'success',
    })),
  };
};

const hoverOnHeartbeat: PlayFunction = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const hearbeat = await canvas.getByText('25 Nov 2022');
  await userEvent.hover(hearbeat);
  await expect(await canvas.findByText('Storybook version: 7.0.0-alpha.51')).toBeInTheDocument();
};

export const Success: Story = {
  args: createMock({ lastStatus: 'success' }),
};

export const SuccessHovered: Story = {
  ...Success,
  play: hoverOnHeartbeat,
};

export const Failure: Story = {
  args: createMock({ lastStatus: 'failure' }),
};

export const FailureHovered: Story = {
  ...Failure,
  play: hoverOnHeartbeat,
};

export const Indecisive: Story = {
  args: createMock({ lastStatus: 'indecisive' }),
};

export const IndecisiveHovered: Story = {
  ...Indecisive,
  play: hoverOnHeartbeat,
};

export const NoData: Story = {
  args: createMock({ lastStatus: 'no-data' }),
};

export const NoDataHovered: Story = {
  ...NoData,
  play: hoverOnHeartbeat,
};

export const RecentlyAddedTemplate: Story = {
  args: {
    ...createMock({ lastStatus: 'indecisive' }),
    results: createMock({ lastStatus: 'indecisive' }).results.map((r, index) => ({ ...r, status: index === 89 ? 'success' : 'no-data' })),
  },
};

export const SixtyDayView: Story = {
  ...Success,
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
  ...Success,
  parameters: {
    viewport: {
      defaultViewport: 'small',
    },
    chromatic: {
      viewports: [600],
    },
  },
};
