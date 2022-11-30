'use client';

import { Heading } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import Head from 'next/head';
import { Link } from '../components/Link';
import { StatusRowGroup } from '../components/StatusRowGroup';
// TODO: replace with actual data, use mocks for now
import { createMock } from '~/mock';

const Container = styled.div`
  margin-top: 40px;
`;

const mocks = [
  createMock({ name: 'React Vite (Typescript) ' }),
  createMock({ name: 'Angular Webpack5 (Typescript) ' }),
  createMock({ name: 'Vue Vite (Javascript) ' }),
];

export default function StatusPage() {
  return (
    <>
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
        <StatusRowGroup data={mocks} />
      </Container>
    </>
  );
}
