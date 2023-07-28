import React, { ComponentProps, FC } from 'react';
import { styles } from '@storybook/components-marketing';
import { styled } from '@storybook/theming';
const { marketing, breakpoint, color } = styles;

// copied from Heading component at @storybook/design-system
// which got removed in https://github.com/storybookjs/design-system/pull/404
const StyledHeading = styled.h2`
  color: ${color.darkest};
  ${marketing.subheading}
  margin-bottom: 4px;
  @media (min-width: ${breakpoint * 1}px) {
    ${marketing.heading}
  }
`;

export const Heading: FC<ComponentProps<typeof StyledHeading>> = (props) => <StyledHeading {...props} />;
