import { StoryObj, Meta } from '@storybook/react';

import { SubNav, PAGE_TYPES } from '~/components/layout/SubNav';

const meta = {
  component: SubNav,
  args: {
    routerComponents: [],
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof SubNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Status: Story = {
  args: {
    pageType: PAGE_TYPES.STATUS,
  },
};
