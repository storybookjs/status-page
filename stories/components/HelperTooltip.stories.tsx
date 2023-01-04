import { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { HelperTooltip } from '~/components/HelperTooltip';

const meta = {
  component: HelperTooltip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ur4kydUbRqdDyfoZWzdiIw/Storybook-app?node-id=7388%3A121450&t=FMXjXa4dRYaJGqyg-4',
    },
  },
  args: {
    script: 'yarn task --task e2e-tests --template react-vite/default-ts',
    expected: {
      renderer: '@storybook/react',
      framework: '@storybook/react-vite',
      builder: '@storybook/builder-vite',
    },
  },
} as Meta<typeof HelperTooltip>;

export default meta;

type Story = StoryObj<typeof HelperTooltip>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tooltip = await canvas.getByRole('button');
    await userEvent.click(tooltip);
  },
};
