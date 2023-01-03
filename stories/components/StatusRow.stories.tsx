import { Meta, StoryObj } from '@storybook/react';
import { StatusRow } from '~/components/StatusRow';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { createMock } from '~/mock/index';

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
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/ur4kydUbRqdDyfoZWzdiIw/Storybook-app?node-id=7326%3A139859&t=PN99IM8A6UifDbmF-3',
    },
  },
  excludeStories: ['createMock'],
} as Meta<typeof StatusRow>;

export default meta;

type Story = StoryObj<typeof meta>;
type PlayFunction = Pick<Story, 'play'>['play'];

const hoverOnHeartbeat: PlayFunction = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const hearbeat = await canvas.getByLabelText('Status for Nov. 25th');
  await userEvent.click(hearbeat);
};

export const Success: Story = {
  args: createMock({ lastStatus: 'success' }),
};

export const SuccessHovered: Story = {
  ...Success,
  play: async (context) => {
    await hoverOnHeartbeat(context);
    const canvas = within(context.canvasElement);

    await expect(await canvas.findByText('v7.0.0-alpha.51')).toBeInTheDocument();
  },
};

export const Failure: Story = {
  args: createMock({ lastStatus: 'failure' }),
};

export const FailureHovered: Story = {
  ...Failure,
  play: async (context) => {
    await hoverOnHeartbeat(context);
    const canvas = within(context.canvasElement);

    await expect(await canvas.findByText('v7.0.0-alpha.51')).toBeInTheDocument();
  },
};

export const Indecisive: Story = {
  args: createMock({ lastStatus: 'indecisive' }),
};

export const IndecisiveHovered: Story = {
  ...Indecisive,
  play: async (context) => {
    await hoverOnHeartbeat(context);
    const canvas = within(context.canvasElement);

    await expect(await canvas.findByText('v7.0.0-alpha.51')).toBeInTheDocument();
  },
};

export const NoData: Story = {
  args: createMock({ lastStatus: 'no-data' }),
};

export const NoDataHovered: Story = {
  ...NoData,
  play: async (context) => {
    await hoverOnHeartbeat(context);
    const canvas = within(context.canvasElement);

    await expect(await canvas.findByText('There is no data for this day')).toBeInTheDocument();
  },
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
