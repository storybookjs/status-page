import { StoryObj, Meta } from '@storybook/react';

import StatusPage from '~/pages/index';

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Pages/Status',
  component: StatusPage,
  parameters: {
    withLayout: true,
    layout: 'fullscreen',
  },
} as Meta<typeof StatusPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
