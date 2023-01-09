import {
  SubNav as MarketingSubNav,
  SubNavRight,
  SubNavTabs,
  SubNavLinkList,
  SubNavDivider,
  SubNavMenus,
  Menu,
} from '@storybook/components-marketing';

import LinkWrapper from 'next/link';
import { StorybookNpmTag } from '~/model/types';

const TOP_LEVEL_PAGE_TYPES = {
  STATUS: 'status',
} as const;

export const PAGE_TYPES = {
  ...TOP_LEVEL_PAGE_TYPES,
  NOT_FOUND: '404',
} as const;

export interface SubNavProps {
  pageType: typeof PAGE_TYPES[keyof typeof PAGE_TYPES];
  npmTag: StorybookNpmTag;
}

const subNavItems = (pageType: SubNavProps['pageType']) => [
  {
    key: '1',
    label: 'Support table',
    href: '/',
    LinkWrapper,
    isActive: pageType === PAGE_TYPES.STATUS,
  },
];

const supportItems = [
  {
    icon: 'github',
    href: 'https://github.com/storybookjs/storybook/issues',
    label: 'Github',
  } as const,
  {
    icon: 'discord',
    href: 'https://discord.gg/storybook',
    label: 'Discord',
  } as const,
];

export const SubNav: React.FC<SubNavProps> = ({ pageType, npmTag }) => {
  return pageType !== PAGE_TYPES.NOT_FOUND ? (
    <MarketingSubNav>
      <SubNavTabs label="Status page nav" items={subNavItems(pageType)} />
      <SubNavDivider />
      <SubNavMenus>
        <Menu
          label={npmTag}
          items={[
            {
              label: 'Versions',
              items: [
                // TODO: uncomment this once SB 7.0 is merged to main in the monorepo, then change url of next from '/status' to '/status/next'
                // { label: 'latest', link: { url: '/status/latest' } },
                { label: 'next', link: { url: '/status' } },
              ],
            },
          ]}
          primary
        ></Menu>
      </SubNavMenus>
      <SubNavRight>
        <SubNavLinkList label="Get support:" items={supportItems} />
      </SubNavRight>
    </MarketingSubNav>
  ) : null;
};
