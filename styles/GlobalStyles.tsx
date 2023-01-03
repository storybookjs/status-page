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
    --color-secondary: #1ea7fd;
    --status-no-data: #dddddd;
    --status-success: #66bf3c;
    --status-failure: #ff4400;
    --status-unsupported: orange;
    --status-indecisive: #8e8d8d;

    --badge-unsupported: #dddddd;
    --badge-success: linear-gradient(-69deg, #22c991 0%, #61d034 100%);
    --badge-failure: linear-gradient(-67deg, #ea7d44 0%, #ff4400 100%);

    --background-secondary: #f3faff;
    --background-error: #fff5cf;

    --text-primary: #333333;
    --text-secondary: #666666;
    --border-subtle: rgba(0, 0, 0, 0.1);

    --spacing-xs: 0.25rem;
    --spacing-s: 0.5rem;
    --spacing-m: 1rem;
    --spacing-l: 1.5rem;
  }
`;

export const GlobalStyles = () => <Global styles={globalStyle} />;
