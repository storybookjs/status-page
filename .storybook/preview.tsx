import React from 'react';
import { loadFontsForStorybook } from '@storybook/design-system';
import { GlobalStyles } from '~/styles/GlobalStyles';
import { AppLayout, AppLayoutProps } from '~/components/layout/AppLayout';
import layoutMock from '~/mock/layout.json';
import { Decorator } from '@storybook/nextjs';

loadFontsForStorybook();

const withGlobalStyle: Decorator = (storyFn, { parameters }) => {
  // global styles will come from layout instead
  if (parameters.withLayout) {
    return storyFn();
  }

  return (
    <>
      <GlobalStyles />
      {storyFn()}
    </>
  );
};

const withLayout: Decorator = (storyFn, { parameters }) => {
  if (!parameters.withLayout) {
    return storyFn();
  }

  return <AppLayout pageProps={layoutMock as AppLayoutProps['pageProps']}>{storyFn()}</AppLayout>;
};

export const decorators: Decorator[] = [withGlobalStyle, withLayout];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
