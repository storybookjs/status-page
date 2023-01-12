import { Heading, styles } from '@storybook/design-system';
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
import { RendererLink } from '~/components/RendererLink';
import { communityRenderers, coreRenderers } from '../utils/renderers';

const { breakpoint, color, typography } = styles;

const Container = styled.div`
  margin-top: 40px;
`;

const Sidebar = styled.div`
  padding-top: 40px;
  position: sticky;
  top: 0;
  height: 100%;
  flex: 0 1 275px;
  @media (max-width: ${breakpoint * 1.333 - 1}px) {
    display: none;
  }
`;

const TOCHeader = styled.div`
  color: ${color.mediumdark};
  font-size: 13px;
  line-height: 24px;
  font-weight: ${typography.weight.extrabold};
  letter-spacing: 0.38em;
  text-transform: uppercase;
  :first-child {
    margin-top: 4px;
  }
  &:not(:first-child) {
    margin-top: 24px;
  }
  margin-bottom: 12px;
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
          Welcome to Storybook’s status page! Each status bar represents the daily CI status for a particular framework integration on
          Storybook’s{' '}
          <Link href="https://github.com/storybookjs/storybook/tree/next" target="_blank">
            next
          </Link>{' '}
          branch. Click on a bar to see its details and the specific Storybook version that was tested.
        </p>
      </header>
      <div style={{ display: 'flex', position: 'relative' }}>
        <Sidebar>
          <TOCHeader>Core</TOCHeader>
          {coreRenderers.map((renderer) => (
            <RendererLink key={renderer} renderer={renderer} />
          ))}

          <TOCHeader>Community</TOCHeader>
          {communityRenderers.map((renderer) => (
            <RendererLink key={renderer} renderer={renderer} />
          ))}
        </Sidebar>
        <Container style={{ flex: 1 }}>
          <StatusRowGroup
            data={
              templateData.map((template) => ({
                ...template,
                results: template.results.map((result) => ({ ...result, date: new Date(result.date) })),
              })) as TemplateTests[]
            }
          />
        </Container>
      </div>
    </AppLayout>
  );
}

const MOCK_DATA = {
  pageProps: layoutMocks,
  templateData: templateMocks,
  npmTag: 'next',
};

// DO NOT COMMIT THIS AS TRUE
const USE_MOCKS = false;

export const getStaticProps: GetStaticProps = async ({ params = {} }) => {
  // TODO: change default value from 'next' to 'latest' once SB 7.0 is merged to main in the monorepo
  const { npmTag: storybookNpmTag = 'next' } = params as { npmTag: StorybookNpmTag };

  if (USE_MOCKS) {
    return {
      props: MOCK_DATA,
    };
  }

  const dxData = await getDxData();

  const templateData = await fetchCircleCiData({ storybookNpmTag });
  return { props: { pageProps: { ...dxData, npmTag: storybookNpmTag }, templateData } };
};
