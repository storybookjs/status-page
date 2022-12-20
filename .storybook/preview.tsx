import React from 'react';
import { loadFontsForStorybook } from '@storybook/design-system';
import { GlobalStyles } from '~/styles/GlobalStyles';
import { Decorator } from '@storybook/nextjs';

loadFontsForStorybook();

const withGlobalStyle: Decorator = (storyFn, { parameters }) => {
  return (
    <>
      <GlobalStyles />
      {storyFn()}
    </>
  );
};

export const decorators: Decorator[] = [withGlobalStyle];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
