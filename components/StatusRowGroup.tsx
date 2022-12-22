import { styled } from '@storybook/theming';
import { memo } from 'react';
import type { TemplateTests } from '~/model/types';
// import { StatusBar } from './StatusBar';
import { StatusRow } from './StatusRow';

const ResultGrid = styled.div`
  border-radius: 5px;
  box-shadow: var(--border-subtle) 0px 2px 5px 0px;

  .result-box {
    border: 1px solid var(--border-subtle);
    border-radius: 0px;
  }

  .result-box:first-of-type {
    border-top-width: 1px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .result-box:not(:first-of-type) {
    border-top: none;
  }

  .result-box:first-child:last-of-type {
    border-radius: 5px;
  }

  .result-box:last-of-type {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

export const StatusRowGroup = memo(({ data }: { data: TemplateTests[] }) => {
  /**
   * TODO: Remove all comments and props must be changed to something like:
   * {
   *   status: 'success', // bubbled up status from all templates
   *   renderer: 'React',
   *   featureCount: 10, // total number of features e.g. addons + store
   *   failureCount: 0, // bubbled up failure count from all templates
   *   configurationCount: 5, // number of templates
   *   tests: TemplateTests[]
   * }
   */
  // const statusBarProps = {
  //   renderer: 'React',
  //   status: 'success',
  //   lastUpdatedAt: '2022-12-20T15:42:22.768Z',
  //   configurationCount: 3,
  //   featureCount: 10,
  //   failureCount: 0,
  // } as const;

  return (
    <ResultGrid>
      {/* <StatusBar  {...statusBarProps} /> */}
      {data.map((result, index) => (
        <StatusRow key={result.id + index} {...result} />
      ))}
    </ResultGrid>
  );
});
