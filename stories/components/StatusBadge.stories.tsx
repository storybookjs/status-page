import { Meta, StoryObj } from '@storybook/react';

import { StatusBadge } from '~/components/StatusBadge';

const meta = {
  component: StatusBadge,
} as Meta<typeof StatusBadge>;

export default meta;

type Story = StoryObj<typeof StatusBadge>;

export const Success: Story = {
  args: {
    status: 'success',
  },
};

export const Failure: Story = {
  args: {
    status: 'failure',
  },
};

export const Unsupported: Story = {
  args: {
    status: 'unsupported',
  },
};

export const Large: Story = {
  args: {
    status: 'success',
    large: true,
  },
};
