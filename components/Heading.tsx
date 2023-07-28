import React, { ComponentProps, FC } from 'react';
import { styles as theme } from '@storybook/design-system';
import { styled } from '@storybook/theming';

// copied from Heading component at @storybook/design-system
// which got removed in https://github.com/storybookjs/design-system/pull/404
const StyledHeading = styled.h2`
  color: ${theme.color.darkest};
  font-size: ${theme.typography.size.m3}px;
  font-weight: ${theme.typography.weight.bold};
  letter-spacing: -0.29px;
  line-height: ${theme.typography.size.l2}px;
  margin-bottom: 4px;
  @media (min-width: ${theme.breakpoint * 1}px) {
    font-size: 36px;
    margin-bottom: 8px;
    letter-spacing: -0.37px;
  }
`;

export const Heading: FC<ComponentProps<typeof StyledHeading>> = (props) => <StyledHeading {...props} />;
