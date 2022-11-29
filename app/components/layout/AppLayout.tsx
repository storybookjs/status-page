'use client';

import { Footer as MarketingFooter, LinksContextProvider, Links, defaultLinks } from '@storybook/components-marketing';
import { styles } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import NextLink from 'next/link';
import { Header, HeaderProps } from './Header';
import { GlobalStyles } from '~/styles/GlobalStyles';

type FooterProps = React.ComponentProps<typeof MarketingFooter>;
export interface AppLayoutProps {
  children: React.ReactNode;
  pageProps: Partial<HeaderProps> & Pick<FooterProps, 'subscriberCount'>;
}

const navLinks: Links = {
  ...defaultLinks,
  // @ts-expect-error TODO: add this in @storybook/components-marketing
  status: { url: '/', linkWrapper: NextLink },
};

const Main = styled.div`
  ${styles.pageMargins}
`;

const Footer = styled(MarketingFooter)`
  margin-top: 80px;
`;

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  pageProps: { githubStars, latestPost, latestVersion, subscriberCount },
}) => (
  <>
    <GlobalStyles />
    <LinksContextProvider value={navLinks}>
      {githubStars && latestPost && latestVersion && (
        <Header githubStars={githubStars} latestPost={latestPost} latestVersion={latestVersion} pageType="status" />
      )}
      <Main>{children}</Main>
      {subscriberCount && <Footer subscriberCount={subscriberCount} />}
    </LinksContextProvider>
  </>
);
