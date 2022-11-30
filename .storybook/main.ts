import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    docsPage: true,
  },
  features: {
    interactionsDebugger: true,
  },
};

export default config;
