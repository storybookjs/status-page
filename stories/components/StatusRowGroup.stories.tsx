import { Meta, StoryObj } from '@storybook/react';
import { createMock } from '~/mock/index';

import { StatusRowGroup } from '~/components/StatusRowGroup';

const meta = {
  component: StatusRowGroup,
} as Meta<typeof StatusRowGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const mocks = [createMock({ name: 'React Vite (TS)' }), createMock({ name: 'React Webpack5 (TS)' }), createMock({ name: 'Next.js' })];

export const Single: Story = {
  args: {
    data: [mocks[0]],
  },
};

export const Multiple: Story = {
  args: {
    data: mocks,
  },
};
