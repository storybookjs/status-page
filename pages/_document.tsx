import Document, { Html, Head, Main, NextScript } from 'next/document';
import { global } from '@storybook/design-system';

const { fontUrl } = global;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const isDeployPreview = process.env.CONTEXT === 'deploy-preview';
export const SITE_URL = isDeployPreview ? `${process.env.DEPLOY_PRIME_URL}/${basePath}` : `https://storybook.js.org/${basePath}`;
export const getBasePathedSrc = (src: string) => (basePath && /^\//.test(src) ? `${basePath}${src}` : src);

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="title" content="Storybook status" />
          <meta name="description" content="Daily CI checks for all officially supported framework integrations on Storybook." />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://storybook.js.org/status/" />
          <meta property="og:title" content="Storybook status" />
          <meta property="og:description" content="Daily CI checks for all officially supported framework integrations on Storybook." />
          <meta property="og:image" content={`${SITE_URL}/images/og-status.jpg`} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://storybook.js.org/status/" />
          <meta property="twitter:title" content="Storybook status" />
          <meta
            property="twitter:description"
            content="Daily CI checks for all officially supported framework integrations on Storybook."
          />
          <meta property="twitter:image" content={`${SITE_URL}/images/og-status.jpg`} />
          <link rel="apple-touch-icon" sizes="180x180" href={getBasePathedSrc('/images//apple-touch-icon.png')} />
          <link rel="icon" type="image/png" sizes="32x32" href={getBasePathedSrc('/images/favicon-32x32.png')} />
          <link rel="icon" type="image/png" sizes="16x16" href={getBasePathedSrc('/images/favicon-16x16.png')} />
          <link rel="manifest" href={getBasePathedSrc('/images/site.webmanifest')} />
          <link rel="shortcut icon" href={getBasePathedSrc('/images/favicon.svg')} />
          <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="true" />
          <link href={fontUrl} rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
