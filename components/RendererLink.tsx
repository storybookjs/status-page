import { styled } from '@storybook/theming';
import { styles } from '@storybook/design-system';

import reactLogo from '../public/logo-react.svg';
import vueLogo from '../public/logo-vue.svg';
import angularLogo from '../public/logo-angular.svg';
import webComponentsLogo from '../public/logo-web-components.svg';
import emberLogo from '../public/logo-ember.svg';
import htmlLogo from '../public/logo-html.svg';
import svelteLogo from '../public/logo-svelte.svg';
import preactLogo from '../public/logo-preact.svg';

import Image from 'next/image';

const { color, typography } = styles;

const RootRenderLink = styled.a`
  display: flex;
  align-items: center;
  font-weight: ${typography.weight.regular};
  font-size: ${typography.size.s3}px;
  line-height: 20px;
  text-decoration: none;
  color: ${color.darkest};
  transition: color 150ms ease-out;
  outline: 0;
  padding: 10px 0;

  svg {
    color: ${color.dark};
  }

  svg,
  img {
    flex: none;
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }

  &:hover,
  &:focus,
  &:active {
    color: #666666;
    font-weight: 700;
  }
`;

const RenderLabel = styled.div`
  white-space: nowrap;
  text-transform: capitalize;
  flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 0;
`;

export function RendererLink({ renderer }: { renderer: string }) {
  const renderLogo = {
    react: reactLogo,
    vue: vueLogo,
    angular: angularLogo,
    'web-components': webComponentsLogo,
    svelte: svelteLogo,
    ember: emberLogo,
    html: htmlLogo,
    preact: preactLogo,
  }[renderer];

  return (
    <RootRenderLink key={renderer} role="menuitem" href={`#${renderer}`}>
      {renderLogo && <Image {...renderLogo} alt={renderer} />}
      <RenderLabel>{renderer.replace('-', ' ')}</RenderLabel>
    </RootRenderLink>
  );
}
