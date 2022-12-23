import { styled } from '@storybook/theming';
import { memo } from 'react';
import type { TemplateTests } from '~/model/types';
// import { StatusBar } from './StatusBar';
import { StatusRow } from './StatusRow';
import { StatusBar } from '~/components/StatusBar';

const ResultGrid = styled.div`
  border-radius: 5px;
  box-shadow: var(--border-subtle) 0px 2px 5px 0px;
  margin-bottom: 16px;

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
    <>
      {Array.from(groupByRenderer(data).entries()).map(([renderer, templates]) => (
        <ResultGrid key={renderer}>
          <StatusBar
            renderer={renderer.replace('@storybook/', '').replace('-', ' ')}
            status={getStatusOfGroup(templates)}
            configurationCount={templates.length}
            lastUpdatedAt={getLastUpdatedAt(data)}
          />
          {templates.map((result, index) => (
            <StatusRow key={result.id + index} {...result} />
          ))}
        </ResultGrid>
      ))}
    </>
  );
});

function getLatestDecisiveResult(template: TemplateTests) {
  return [...template.results].reverse().find((it) => ['success', 'failure'].includes(it.status));
}

function getStatusOfGroup(templates: TemplateTests[]) {
  return templates.every((template) => getLatestDecisiveResult(template)?.status === 'success') ? 'success' : 'failure';
}

function getLastUpdatedAt(array: TemplateTests[]): Date | undefined {
  return array
    .map((template) => getLatestDecisiveResult(template)?.date)
    .filter((template): template is NonNullable<typeof template> => template != null)
    .sort((a, b) => a.getTime() - b.getTime())[0];
}

function groupByRenderer(array: TemplateTests[]) {
  const map = new Map<string, TemplateTests[]>();
  for (const templateTests of array) {
    const renderer = templateTests.config?.expected.renderer ?? 'Unknown Renderer';
    map.set(renderer, [...(map.get(renderer) ?? []), templateTests]);
  }
  return map;
}
