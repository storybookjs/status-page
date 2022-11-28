import { memo } from 'react';
import { useElementSize } from 'usehooks-ts';
import type { TemplateTests, TestResult } from '../model/types';
import { WithTooltip } from '@storybook/design-system';
import { getFormattedDate } from '../util';
import { StatusInfo } from './StatusInfo';
import './StatusRow.css';

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
    <section className="result-box" ref={chartRef}>
      <article>
        <div className="result-heading">
          <div className="template-name">{name}</div>
          <div className="template-status" data-status={mostRecentStatus}>
            {templateStatus}
          </div>
        </div>

        <svg className="heartbeat-chart" preserveAspectRatio="none" height={34} viewBox={viewBox}>
          {results.map((result, index) => {
            const { date, status } = result;
            const day = getFormattedDate(date);
            return (
              <WithTooltip key={day} tagName="g" role="" tooltip={<StatusInfo {...result} />} trigger="hover">
                <rect
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
                </rect>
              </WithTooltip>
            );
          })}
        </svg>
        <div className="result-footer">
          <div className="template-name">{daysToDisplay} days ago</div>
          <div className="template-status">Today</div>
        </div>
      </article>
    </section>
  );
});
