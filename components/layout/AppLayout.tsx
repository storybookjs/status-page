'use client';

import { Footer as MarketingFooter, LinksContextProvider, Links, defaultLinks } from '@storybook/components-marketing';
import { styles } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import NextLink from 'next/link';
import { Header, HeaderProps } from './Header';
import { GlobalStyles } from '~/styles/GlobalStyles';
import { StorybookNpmTag } from '~/model/types';

type FooterProps = React.ComponentProps<typeof MarketingFooter>;

export type PageProps = Partial<HeaderProps> & Pick<FooterProps, 'subscriberCount'> & { npmTag: StorybookNpmTag };

export interface AppLayoutProps {
  children: React.ReactNode;
  pageProps: PageProps;
}

const navLinks: Links = {
  ...defaultLinks,
  status: { url: '/', linkWrapper: NextLink },
};

const Main = styled.div`
  ${styles.pageMargins}
`;

const Footer = styled(MarketingFooter)`
  margin-top: 80px;
`;

export const AppLayout: React.FC<AppLayoutProps> = ({ children, pageProps: { githubStars, latestVersion, subscriberCount, npmTag } }) => (
  <>
    <GlobalStyles />
    <LinksContextProvider value={navLinks}>
      {githubStars && latestVersion && <Header githubStars={githubStars} latestVersion={latestVersion} pageType="status" npmTag={npmTag} />}
      <Main>{children}</Main>
      {subscriberCount && <Footer subscriberCount={subscriberCount} />}
    </LinksContextProvider>
  </>
);
