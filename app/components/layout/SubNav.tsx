import {
  SubNav as MarketingSubNav,
  SubNavRight,
  SubNavTabs,
  SubNavMenus,
  SubNavDivider,
  Menu,
  SubNavLinkList,
} from '@storybook/components-marketing';

import LinkWrapper from 'next/link';

const TOP_LEVEL_PAGE_TYPES = {
  // TODO: discuss if we even want a subnav, keeping this to show designers for now
  SUPPORT: 'support',
  STATUS: 'status',
} as const;

export const PAGE_TYPES = {
  ...TOP_LEVEL_PAGE_TYPES,
  NOT_FOUND: '404',
} as const;

export interface SubNavProps {
  pageType: typeof PAGE_TYPES[keyof typeof PAGE_TYPES];
}

const subNavItems = (pageType: SubNavProps['pageType']) => [
  {
    key: '1',
    label: 'Support table',
    href: '/',
    LinkWrapper,
    isActive: pageType === PAGE_TYPES.SUPPORT,
  },
  {
    key: '2',
    label: 'Status',
    href: '/status',
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

export const SubNav: React.FC<SubNavProps> = ({ pageType }) => {
  return pageType !== PAGE_TYPES.NOT_FOUND ? (
    <MarketingSubNav>
      <SubNavTabs label="Status page nav" items={subNavItems(pageType)} />
      {/* @ts-expect-error TODO: weird type error from the component, expecting a theme */}
      <SubNavDivider />
      {/* @ts-expect-error TODO: weird type error from the component, expecting a theme */}
      <SubNavMenus>
        <Menu
          label="7.0 (alpha)"
          items={[
            // this is just for show, the component doesn't make much sense for the status page
            // unless we don't want to have local state and change version based on route
            {
              label: 'stable',
              items: [{ label: '6.5 (latest)', link: { url: '' } }],
            },
            {
              label: 'pre-release',
              items: [{ label: '7.0 (alpha)', link: { url: '' } }],
            },
          ]}
          primary
        ></Menu>
      </SubNavMenus>
      {/* @ts-expect-error TODO: weird type error from the component, expecting a theme */}
      <SubNavRight>
        <SubNavLinkList label="Get support:" items={supportItems} />
      </SubNavRight>
    </MarketingSubNav>
  ) : null;
};
