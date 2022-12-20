import { Meta, StoryObj } from '@storybook/react';
import { createMock } from '~/mock/index';

import { StatusRowGroup } from '~/components/StatusRowGroup';

const meta = {
  component: StatusRowGroup,
} as Meta<typeof StatusRowGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

const mocks = [
  createMock({ name: 'React Vite (Typescript)' }),
  createMock({ name: 'Angular Webpack5 (Typescript)' }),
  createMock({ name: 'Vue Vite (Javascript)' }),
];

export const Single: Story = {
  args: {
    data: [mocks[0]],
  },
};

export const Two: Story = {
  args: {
    data: [mocks[0], mocks[1]],
  },
};

export const Three: Story = {
  args: {
    data: mocks,
  },
};
