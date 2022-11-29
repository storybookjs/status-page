import { styled } from '@storybook/theming';
import { memo } from 'react';
import type { TemplateTests } from '~/model/types';
import { StatusRow } from './StatusRow';

const ResultGrid = styled.div`
  .result-box {
    border: 1px solid var(--border-subtle);
    border-radius: 0px;
  }

  .result-box:first-child {
    border-top-width: 1px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .result-box:not(:first-child) {
    border-top: none;
  }

  .result-box:first-child:last-child {
    border-radius: 4px;
  }

  .result-box:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export const StatusRowGroup = memo(({ data }: { data: TemplateTests[] }) => {
  return (
    <ResultGrid>
      {data.map((result, index) => (
        <StatusRow key={result.id + index} {...result} />
      ))}
    </ResultGrid>
  );
});
