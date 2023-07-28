import type { StorybookConfig } from '@storybook/nextjs';
const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y', '@storybook/addon-designs'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      // Mock assert to avoid issues like Cannot read properties of undefined (reading 'custom')
      assert: false,
    };
    return config;
  },
};
export default config;
