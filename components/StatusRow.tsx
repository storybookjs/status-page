import { ComponentProps, memo } from 'react';
import { useElementSize } from 'usehooks-ts';
import type { TemplateTests, TestResult } from '~/model/types';
import { WithTooltip, Badge } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { getFormattedDate } from '~/util/index';
import { StatusInfo } from './StatusInfo';

type BadgeProps = ComponentProps<typeof Badge>;

const statusByResult: Record<TestResult['status'], { type: BadgeProps['status']; label: string }> = {
  'no-data': {
    type: 'neutral',
    label: 'No recent data',
  },
  success: { type: 'positive', label: 'Operational' },
  failure: { type: 'negative', label: 'Issues' },
  indecisive: { type: 'warning', label: 'Inconclusive results' },
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

const TemplateName = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #333333;
`;

const HeartBeatChart = styled.svg`
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

const Container = styled.article`
  display: grid;
  gap: var(--spacing-s);
`;

export const StatusRow = memo(({ results, name }: TemplateTests) => {
  const [chartRef, { width }] = useElementSize();

  // Not that it will ever happen, but just in case so we don't break the website because of malformed data.
  if (!results?.length) {
    return <div>There was a problem processing this data. Please try again later.</div>;
  }

  const mostRecentStatus = results.at(-1)?.status || 'no-data';
  const { label: statusLabel, type: statusType } = statusByResult[mostRecentStatus];

  // by default width is 0, so we assume the default view which is 90 days
  const daysToDisplay = width === 0 || width >= 850 ? 90 : width >= 600 ? 60 : 30;

  // svg always render 90 days, but changes viewBox to show 90, 60 or 30 days data based on container size
  const viewBox = viewBoxByDayView[daysToDisplay];

  return (
    <ResultBox ref={chartRef} className="result-box">
      <Container>
        <ResultHeading>
          <TemplateName>{name}</TemplateName>
          <Badge status={statusType}>{statusLabel}</Badge>
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
      </Container>
    </ResultBox>
  );
});
