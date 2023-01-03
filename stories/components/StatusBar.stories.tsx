import { Meta, StoryObj } from '@storybook/react';

import { StatusBar } from '~/components/StatusBar';

const meta = {
  component: StatusBar,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    renderer: 'React',
    status: 'success',
    lastUpdatedAt: new Date('2022-12-20T15:42:22.768Z'),
    configurationCount: 3,
    featureCount: 10,
  },
} as Meta<typeof StatusBar>;

export default meta;

type Story = StoryObj<typeof StatusBar>;

export const Success: Story = {};

export const Failure: Story = {
  args: {
    status: 'failure',
    failureCount: 2,
  },
};
