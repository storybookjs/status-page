import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '~/components/Analytics';

import { GlobalStyles } from '~/styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
