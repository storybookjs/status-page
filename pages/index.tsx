import { Heading } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Link } from '~/components/Link';
import { StatusRowGroup } from '~/components/StatusRowGroup';
import { StorybookNpmTag, TemplateTests } from '~/model/types';
import { AppLayout, PageProps } from '~/components/layout/AppLayout';
import templateMocks from '~/mock/template-tests.json';
import layoutMocks from '~/mock/layout.json';
import { fetchCircleCiData } from '~/client/fetch-circle-ci-data';
import { getDxData } from '~/client/dx-data';

const Container = styled.div`
  margin-top: 40px;
`;

type Props = {
  pageProps: PageProps;
  templateData: TemplateTests[];
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

const MOCK_DATA = {
  pageProps: layoutMocks,
  templateData: templateMocks,
};

// DO NOT COMMIT THIS AS TRUE
const USE_MOCKS = false;

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  const { npmTag: storybookNpmTag } = params as { npmTag: StorybookNpmTag };

  if (USE_MOCKS) {
    return {
      props: MOCK_DATA,
    };
  }

  const dxData = await getDxData();

  const templateData = await fetchCircleCiData({ storybookNpmTag });
  return { props: { pageProps: dxData, templateData } };
};
