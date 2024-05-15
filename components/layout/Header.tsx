import * as React from 'react';
import { Nav } from '@storybook/components-marketing';
import { styles } from '@storybook/design-system';
import { styled } from '@storybook/theming';

import { SubNav, SubNavProps } from './SubNav';
import { StorybookNpmTag } from '~/model/types';

type NavProps = React.ComponentProps<typeof Nav>;

export interface HeaderProps {
  githubStars: NavProps['githubStarCount'];
  inverse?: NavProps['inverse'];
  latestVersion: NavProps['version'];
  pageType: SubNavProps['pageType'];
  npmTag: StorybookNpmTag;
}

const HeaderWrapper = styled.header`
  margin-bottom: 48px;

  @media (min-width: ${styles.breakpoint}px) {
    margin-bottom: 64px;
  }
`;

export const Header: React.FC<HeaderProps> = ({ githubStars, inverse, latestVersion, pageType, npmTag }) => {
  return (
    <HeaderWrapper>
      <Nav
        apiKey={process.env.ALGOLIA_API_KEY as string}
        inverse={inverse}
        version={latestVersion}
        activeSection="docs"
        githubStarCount={githubStars}
      />
      <SubNav pageType={pageType} npmTag={npmTag} />
    </HeaderWrapper>
  );
};
