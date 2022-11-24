import { memo } from 'react';
import { useElementSize } from 'usehooks-ts';
import type { TemplateTests, TestResult } from '../model/types';
import { getFormattedDate } from '../util';
import './StatusRow.css';

const statusByResult: Record<TestResult['status'], string> = {
  'no-data': '',
  success: 'All good',
  failure: 'Problems!',
  indecisive: 'Weird Stuff 🤔',
};

const viewBoxByDayView = {
  90: '0 0 448 34',
  60: '150 0 298 34',
  30: '300 0 148 34',
};

export const StatusRow = memo(({ results, name }: TemplateTests) => {
  const [chartRef, { width }] = useElementSize();

  const mostRecentStatus = results[0].status;
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
          {results.map(({ date, status }, index) => {
            const day = getFormattedDate(date);
            return (
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
