import { SubNav as MarketingSubNav, SubNavRight, SubNavTabs, SubNavLinkList } from '@storybook/components-marketing';

import LinkWrapper from 'next/link';

const TOP_LEVEL_PAGE_TYPES = {
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
      <SubNavRight>
        <SubNavLinkList label="Get support:" items={supportItems} />
      </SubNavRight>
    </MarketingSubNav>
  ) : null;
};
