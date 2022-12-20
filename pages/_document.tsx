import Document, { Html, Head, Main, NextScript } from 'next/document';
import { global } from '@storybook/design-system';

const { fontUrl } = global;

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
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
