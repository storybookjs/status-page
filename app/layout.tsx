import React from 'react';
import { AppLayout as Layout } from './components/layout/AppLayout';

const LAYOUT_DATA_ENDPOINT = 'https://storybook-dx.netlify.app/.netlify/functions/dx-data';

const DefaultLayout = async ({ children }: { children: React.ReactNode }) => {
  const res = await fetch(LAYOUT_DATA_ENDPOINT);
  const pageProps = await res.json();

  return (
    <html>
      <body>
        <Layout pageProps={pageProps}>{children}</Layout>
      </body>
    </html>
  );
};

export default DefaultLayout;
