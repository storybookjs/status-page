import * as React from 'react';
import NextLink from 'next/link';
import { Link as DSLink } from '@storybook/design-system';

export const Link = (props: React.ComponentProps<typeof DSLink>) => <DSLink LinkWrapper={NextLink} {...props}></DSLink>;
