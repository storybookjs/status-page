import { AppLayout } from '~/components/layout/AppLayout';
import Head from 'next/head';
import { Heading } from '@storybook/design-system';
import { Link } from '~/components/Link';
import { StatusRowGroup } from '~/components/StatusRowGroup';
import { TemplateTests } from '~/model/types';
import { styled } from '@storybook/theming';

const Container = styled.div`
  margin-top: 40px;
`;

type Props = {
  pageProps: any;
  templateData: TemplateTests[];
};

export function StatusPage({ pageProps, templateData }: Props) {
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
