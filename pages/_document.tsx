import Document, { Html, Head, Main, NextScript } from 'next/document';
import { global } from '@storybook/design-system';

const { fontUrl } = global;

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="title" content="Storybook status" />
          <meta
            name="description"
            content="Daily CI checks for all officially supported framework integrations on Storybook's next branch."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://storybook.js.org/docs/react/why-storybook/" />
          <meta property="og:title" content="Storybook status" />
          <meta
            property="og:description"
            content="Daily CI checks for all officially supported framework integrations on Storybook's next branch."
          />
          <meta property="og:image" content="https://storybook.js.org/images/social/open-graph.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://storybook.js.org/docs/react/why-storybook/" />
          <meta property="twitter:title" content="Storybook status" />
          <meta
            property="twitter:description"
            content="Daily CI checks for all officially supported framework integrations on Storybook's next branch."
          />
          <meta property="twitter:image" content="https://storybook.js.org/images/social/open-graph.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/day/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/day/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/day/favicon-16x16.png" />
          <link rel="manifest" href="/day/site.webmanifest" />
          <link rel="shortcut icon" href="/day/favicon.svg" />
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
