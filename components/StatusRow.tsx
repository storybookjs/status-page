import { memo, useState } from 'react';
import { useElementSize } from 'usehooks-ts';
import type { TemplateTests, TestResult } from '~/model/types';
import { styles, TooltipNote, WithTooltip } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { getFormattedDate } from '~/util/index';
import { StatusInfo } from './StatusInfo';
import { StatusBadge } from './StatusBadge';

const ResultBox = styled.section<{ isFailure?: boolean }>`
  border: 1px solid var(--border-subtle);
  padding: 20px 30px 25px;
  border-radius: 4px;
  color: var(--text-secondary);
  background-color: ${(props) => (props.isFailure ? 'var(--background-error)' : 'white')};

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
  gap: 6px;
  margin-bottom: 8px;
`;

const TemplateName = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: var(--text-primary);
`;

const HeartBeatChart = styled.div`
  width: 100%;
  height: 28px;
  display: grid;
  align-items: stretch;
  grid-template-columns: repeat(auto-fit, minmax(3px, 1fr));
  gap: 4px;

  button {
    outline: none;
  }
`;

const HeartBeat = styled.div<{ isSelected?: boolean; scrubMode?: boolean }>`
  cursor: pointer;
  position: relative;
  background: currentColor;
  height: ${(props) => (props.isSelected ? '100%' : 'calc(100% - 4px)')};
  width: 100%;
  opacity: ${(props) => (props.scrubMode && !props.isSelected ? 0.6 : 1)};

  button:hover &,
  button:focus &,
  button:focus-visible & {
    opacity: 1;
    height: ${(props) => (props.isSelected ? '100%' : 'calc(100% - 2px)')};
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 5px 0px;
  }
  &:before {
    content: '';
    position: absolute;
    inset: 0 -2px;
  }
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

export const StatusRow = memo(({ results, config, id }: TemplateTests) => {
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
    <ResultBox ref={chartRef} className="result-box" isFailure={infoToDisplay?.status === 'failure'}>
      <article>
        <ResultHeading>
          <StatusBadge style={{ marginBottom: '2px' }} status={mostRecentStatus}></StatusBadge>
          <TemplateName>{config?.name ?? id}</TemplateName>
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
                aria-label={`Status for ${day}: ${status}`}
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
      </article>
    </ResultBox>
  );
});
