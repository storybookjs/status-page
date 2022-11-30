import { styled } from '@storybook/theming';
import { memo } from 'react';
import type { TemplateTests } from '~/model/types';
import { StatusRow } from './StatusRow';

const ResultGrid = styled.div`
  .result-box {
    border: 1px solid var(--border-subtle);
    border-radius: 0px;
  }

  .result-box:first-of-type {
    border-top-width: 1px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .result-box:not(:first-of-type) {
    border-top: none;
  }

  .result-box:first-child:last-of-type {
    border-radius: 4px;
  }

  .result-box:last-of-type {
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
