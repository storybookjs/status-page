import { StoryObj, Meta } from '@storybook/react';

import StatusPage from '~/pages/index';
import layoutMocks from '~/mock/layout.json';
import templateMocks from '~/mock/template-tests.json';
import { TemplateTests } from '~/model/types';

const meta = {
  // eslint-disable-next-line storybook/no-title-property-in-meta
  title: 'Pages/Status',
  component: StatusPage,
  args: {
    pageProps: layoutMocks,
    templateData: templateMocks.map((template) => ({
      ...template,
      results: template.results.map((result) => ({ ...result, date: new Date(result.date) })),
    })) as TemplateTests[],
  },
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof StatusPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
