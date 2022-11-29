import { styles as marketingStyles } from '@storybook/components-marketing';
import { global } from '@storybook/design-system';
import { css, Global } from '@storybook/theming';

const { bodyStyles } = global;

export const globalStyle = css`
  body {
    ${bodyStyles}

    ${marketingStyles.marketing.textLarge}
  }

  :root {
    --status-no-data: #e9e9e9;
    --status-success: #1ad769;
    --status-failure: #ff4949;
    --status-indecisive: #8e8d8d;

    --background-secondary: #f3faff;

    --text-primary: #444444;
    --text-secondary: #757575;
    --border-subtle: #e0e0e0;

    --spacing-xs: 0.25rem;
    --spacing-s: 0.5rem;
    --spacing-m: 1rem;
    --spacing-l: 1.5rem;
  }
`;

export const GlobalStyles = () => <Global styles={globalStyle} />;
