import * as React from 'react';
import { Eyebrow, Nav } from '@storybook/components-marketing';
import { styles } from '@storybook/design-system';
import { styled } from '@storybook/theming';

import { SubNav, SubNavProps } from './SubNav';

type EyebrowProps = React.ComponentProps<typeof Eyebrow>;
type NavProps = React.ComponentProps<typeof Nav>;

export interface HeaderProps {
  githubStars: EyebrowProps['githubStarCount'];
  inverse?: EyebrowProps['inverse'];
  latestPost: {
    title: EyebrowProps['label'];
    url: EyebrowProps['link'];
  };
  latestVersion: NavProps['version'];
  pageType: SubNavProps['pageType'];
}

const HeaderWrapper = styled.header`
  margin-bottom: 48px;

  @media (min-width: ${styles.breakpoint}px) {
    margin-bottom: 64px;
  }
`;

export const Header: React.FC<HeaderProps> = ({ githubStars, inverse, latestPost, latestVersion, pageType }) => {
  return (
    <HeaderWrapper>
      <Eyebrow githubStarCount={githubStars} label={latestPost.title} link={latestPost.url} inverse={inverse} />
      <Nav
        apiKey={process.env.ALGOLIA_API_KEY as string}
        framework="react"
        inverse={inverse}
        version={latestVersion}
        activeSection="docs"
      />
      <SubNav pageType={pageType} />
    </HeaderWrapper>
  );
};
