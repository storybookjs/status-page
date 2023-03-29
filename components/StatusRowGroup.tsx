import { styled } from '@storybook/theming';
import { memo } from 'react';
import type { TemplateTests } from '~/model/types';
import { StatusRow } from './StatusRow';
import { StatusBar } from './StatusBar';
import { communityRenderers, coreRenderers } from '../utils/renderers';
import { Link } from './Link';

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
  if (data.length === 0) {
    return (
      <div>
        😵‍💫 Oh no! Seems like the status data is missing for this tag. Please reach us on{' '}
        <Link href="https://discord.gg/storybook">Discord</Link> so we can fix this as soon as possible.
      </div>
    );
  }

  return (
    <>
      {Array.from(groupByRenderer(sortByRenderer(data)).entries()).map(([renderer, templates]) => (
        <ResultGrid key={renderer} id={getRendererId(renderer)}>
          <StatusBar
            renderer={getRendererId(renderer)?.replace('-', ' ')}
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

/**
 * When checking the status of a CI run, we need to make sure to consider the most up to date result of a template.
 * A template might not have conclusive results, e.g. it was removed from repro-templates and it does not run anymore, or we were not able to run tests for some reason. In those cases, we need to look at the previous result, and keep looking at the previous result until we find a conclusive result.
 * */
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
    .sort((a, b) => b.getTime() - a.getTime())[0];
}

function groupByRenderer(array: TemplateTests[]) {
  const map = new Map<string, TemplateTests[]>();
  for (const templateTests of array) {
    const renderer = getRendererId(templateTests.config?.expected.renderer);
    map.set(renderer, [...(map.get(renderer) ?? []), templateTests]);
  }
  return map;
}

function sortByRenderer(templates: TemplateTests[]) {
  const renderers = [...coreRenderers, ...communityRenderers];
  const rendererIndex = (template: TemplateTests) => renderers.indexOf(getRendererId(template.config?.expected.renderer) ?? '');
  return [...templates].sort((a, b) => rendererIndex(a) - rendererIndex(b));
}

function getRendererId(renderer?: string) {
  const rendererId = renderer?.replace('@storybook/', '') ?? 'unknown-renderer';
  return rendererId === 'vue3' ? 'vue' : rendererId;
}
