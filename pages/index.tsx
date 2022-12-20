'use client';

import { Heading } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Link } from '~/components/Link';
import { StatusRowGroup } from '~/components/StatusRowGroup';
import { TemplateTests } from '~/model/types';
import { AppLayout } from '~/components/layout/AppLayout';
import templateMocks from '~/mock/template-tests.json';
import layoutMocks from '~/mock/layout.json';

const Container = styled.div`
  margin-top: 40px;
`;

type Props = {
  pageProps: any;
  templateData: any;
};

export default function StatusPage({ pageProps, templateData }: Props) {
  return (
    <AppLayout pageProps={pageProps}>
      <Head>
        <title>Status page | Storybook</title>
      </Head>
      <header>
        <Heading>Status page</Heading>
        <p>
          This is Storybook&apos;s status page, where you can get updates on how our integrations are doing. If you are experiencing issues
          or notices disruptions, you can reach out on <Link href="https://discord.gg/storybook">discord</Link>.
        </p>
      </header>
      <Container>
        {/* TODO use real data here instead */}
        <StatusRowGroup
          data={
            templateData.map((template) => ({
              ...template,
              results: template.results.map((result) => ({ ...result, date: new Date(result.date) })),
            })) as TemplateTests[]
          }
        />
      </Container>
    </AppLayout>
  );
}

const LAYOUT_DATA_ENDPOINT = 'https://storybook-dx.netlify.app/.netlify/functions/dx-data';

const MOCK_DATA = {
  pageProps: layoutMocks,
  templateData: templateMocks,
};

const useMocks = true;

export const getStaticProps: GetStaticProps = async () => {
  if (useMocks) {
    return { props: MOCK_DATA };
  }

  const res = await fetch(LAYOUT_DATA_ENDPOINT);
  const pageProps = await res.json();

  // TODO: provide templateData
  const templateData = {};
  return { props: { pageProps, templateData } };
};
