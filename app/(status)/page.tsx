'use client';

import { Heading } from '@storybook/design-system';
import Head from 'next/head';
import { Link } from '../components/Link';
import { StatusRowGroup } from '../components/StatusRowGroup';
// TODO: replace with actual data, use mocks for now
import { Three } from '../components/StatusRowGroup.stories';

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
      {/* @ts-expect-error use real data here isntead */}
      <StatusRowGroup {...Three.args} />
    </>
  );
}
