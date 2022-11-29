import { memo } from 'react';
import { useElementSize } from 'usehooks-ts';
import type { TemplateTests, TestResult } from '../model/types';
import { WithTooltip } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { getFormattedDate } from '../util';
import { StatusInfo } from './StatusInfo';

const statusByResult: Record<TestResult['status'], string> = {
  'no-data': 'No recent data',
  success: 'Operational',
  failure: 'Issues',
  indecisive: 'Inconclusive results',
};

const viewBoxByDayView = {
  90: '0 0 448 34',
  60: '150 0 298 34',
  30: '300 0 148 34',
};

const ResultBox = styled.section`
  border: 1px solid var(--border-subtle);
  padding: var(--spacing-l);
  border-radius: 4px;
  color: var(--text-secondary);
`;

const ResultHeading = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ResultFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: var(--spacing-xs);
`;

const HeartBeatChart = styled.svg`
  padding-top: var(--spacing-s);
  width: 100%;
  overflow: hidden;
`;

const HeartBeat = styled.rect`
  cursor: pointer;
  &[data-status='success'] {
    color: var(--status-success);
  }

  &[data-status='failure'] {
    color: var(--status-failure);
  }

  &[data-status='indecisive'] {
    color: var(--status-indecisive);
  }

  &[data-status='no-data'] {
    color: var(--status-no-data);
  }
`;

export const StatusRow = memo(({ results, name }: TemplateTests) => {
  const [chartRef, { width }] = useElementSize();

  // Not that it will ever happen, but just in case so we don't break the website because of malformed data.
  if (!results?.length) {
    return <div>There was a problem processing this data. Please try again later.</div>;
  }

  const mostRecentStatus = results.at(-1)?.status || 'no-data';
  const templateStatus = statusByResult[mostRecentStatus];

  const daysToDisplay = width >= 850 ? 90 : width >= 600 ? 60 : 30;
  // svg always render 90 days, but changes viewBox to show 90, 60 or 30 days data based on container size
  const viewBox = viewBoxByDayView[daysToDisplay];

  return (
    <ResultBox ref={chartRef} className="result-box">
      <article>
        <ResultHeading>
          <div>{name}</div>
          <div data-status={mostRecentStatus}>{templateStatus}</div>
        </ResultHeading>

        <HeartBeatChart preserveAspectRatio="none" height={34} viewBox={viewBox}>
          {results.map((result, index) => {
            const { date, status } = result;
            const day = getFormattedDate(date);
            return (
              <WithTooltip key={day} tagName="g" role="" tooltip={<StatusInfo {...result} />} trigger="hover">
                <HeartBeat
                  key={day}
                  height={34}
                  width={3}
                  y={0}
                  x={index * 5}
                  fill="currentColor"
                  data-status={status}
                  aria-label={`Status for ${day} is: ${status}`}
                >
                  {day}
                </HeartBeat>
              </WithTooltip>
            );
          })}
        </HeartBeatChart>
        <ResultFooter>
          <div>{daysToDisplay} days ago</div>
          <div>Today</div>
        </ResultFooter>
      </article>
    </ResultBox>
  );
});
