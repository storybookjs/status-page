import { memo, useState } from 'react';
import { useElementSize } from 'usehooks-ts';
import type { TemplateTests, TestResult } from '~/model/types';
import { styles, TooltipNote, WithTooltip } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { getFormattedDate } from '~/util/index';
import { StatusInfo } from './StatusInfo';
import { StatusBadge } from './StatusBadge';

const ResultBox = styled.section`
  border: 1px solid var(--border-subtle);
  padding: var(--spacing-l);
  border-radius: 4px;
  color: var(--text-secondary);

  // TODO: do proper mobile styling
  @media (max-width: ${styles.breakpoint}px) {
    * {
      font-size: 14px !important;
    }
  }
`;

const ResultHeading = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-s);
`;

const TemplateName = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: #333333;
`;

const HeartBeatChart = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(3px, 1fr));
  align-items: center;
  gap: 0.25rem;
`;

const HeartBeat = styled.span<{ isSelected?: boolean; scrubMode?: boolean }>`
  cursor: pointer;
  display: inline-block;
  height: ${(props) => (props.isSelected ? '40px' : '34px')};
  margin-top: -3px;
  margin-bottom: -3px;
  width: 100%;
  opacity: ${(props) => (props.scrubMode && !props.isSelected ? 0.5 : 1)};
  &:hover {
    opacity: 1;
  }
  &[data-status='success'] {
    background-color: var(--status-success);
  }

  &[data-status='failure'] {
    background-color: var(--status-failure);
  }

  &[data-status='indecisive'] {
    background-color: var(--status-indecisive);
  }

  &[data-status='no-data'] {
    background-color: var(--status-no-data);
  }
`;

const Container = styled.article`
  display: grid;
  gap: var(--spacing-s);
`;

export const StatusRow = memo(({ results, name }: TemplateTests) => {
  const [chartRef, { width }] = useElementSize();
  const [selectedHeartBeat, setSelectedHeartBeat] = useState<TestResult>();
  const [hoveredHeartBeat, setHoveredHeartBeat] = useState<TestResult>();

  // Not that it will ever happen, but just in case so we don't break the website because of malformed data.
  if (!results?.length) {
    return <div>There was a problem processing this data. Please try again later.</div>;
  }

  const mostRecentStatus = results.at(-1)?.status || 'no-data';

  // by default width is 0, so we assume the default view which is 90 days. Will look weird on mobile but 🤷
  const daysToDisplay = width === 0 || width >= 850 ? 90 : width >= 600 ? 60 : 30;

  const infoToDisplay = selectedHeartBeat && (hoveredHeartBeat || selectedHeartBeat);

  const resultsToDisplay = results.slice(-daysToDisplay);

  return (
    <ResultBox ref={chartRef} className="result-box">
      <Container>
        <ResultHeading>
          <StatusBadge status={mostRecentStatus}></StatusBadge>
          <TemplateName>{name}</TemplateName>
        </ResultHeading>
        <HeartBeatChart>
          {resultsToDisplay.map((result) => {
            const { date, status } = result;
            const day = getFormattedDate(date, true);
            const storybookVersion = 'storybookVersion' in result && result.storybookVersion ? `${result.storybookVersion} - ` : '';
            return (
              <WithTooltip
                key={day}
                hasChrome={false}
                tooltip={<TooltipNote note={`${storybookVersion}${day}`} />}
                aria-label={`Status for ${day}`}
                onClick={() => setSelectedHeartBeat(result)}
              >
                <HeartBeat
                  isSelected={result === selectedHeartBeat}
                  scrubMode={!!selectedHeartBeat}
                  onMouseEnter={() => setHoveredHeartBeat(result)}
                  onMouseLeave={() => setHoveredHeartBeat(undefined)}
                  data-status={status}
                />
              </WithTooltip>
            );
          })}
        </HeartBeatChart>
        {infoToDisplay && <StatusInfo {...infoToDisplay} />}
      </Container>
    </ResultBox>
  );
});
