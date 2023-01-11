import { styled } from '@storybook/theming';
import type { Feature } from '~/model/types';

export const StatusBadge = styled.span<{ status: Feature['status'] | string; large?: boolean }>`
  display: inline-block;
  width: ${(props) => (props.large ? '30px' : '10px')};
  height: ${(props) => (props.large ? '30px' : '10px')};
  border-radius: 50%;
  flex-shrink: 0;
  background: ${(props) => {
    switch (props.status) {
      case 'success':
        return 'var(--badge-success)';
      case 'failure':
        return 'var(--badge-failure)';
      case 'unsupported':
        return 'var(--badge-unsupported)';
      default:
        return 'var(--badge-unsupported)';
    }
  }};
`;
