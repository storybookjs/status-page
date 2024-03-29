import { memo, useMemo, useState } from 'react';
import { useElementSize } from 'usehooks-ts';
import type { TemplateTests, TestResult } from '~/model/types';
import { styles, TooltipNote, WithTooltip, Link } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { getFormattedDate } from '~/util/index';
import { StatusInfo } from './StatusInfo';
import { StatusBadge } from './StatusBadge';
import { HelperTooltip } from './HelperTooltip';

const ExpandCollapseButton = styled(Link)`
  margin-left: auto;
  font-size: 14px;
  line-height: 20px;
`;

const StyledSpan = styled.span`
  color: var(--text-secondary);
`;

const ResultBox = styled.section<{ isFailure?: boolean }>`
  border: 1px solid var(--border-subtle);
  padding: 20px 30px 25px;
  border-radius: 4px;
  color: var(--text-secondary);
  background-color: white;

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

const UptimeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 12px;
`;

const Spacer = styled.span`
  background: var(--border-subtle);
  flex: 1;
  margin: 0 0.75rem;
  height: 1px;
`;

const getReproScript = (template: string) => `yarn task --task e2e-tests --template ${template}`;

export const StatusRow = memo(({ results, config, id, showUptime }: TemplateTests & { showUptime?: boolean }) => {
  const [chartRef, { width }] = useElementSize();
  const [selectedHeartBeat, setSelectedHeartBeat] = useState<TestResult>();
  const [hoveredHeartBeat, setHoveredHeartBeat] = useState<TestResult>();
  const reproScript = useMemo(() => getReproScript(id), [id]);

  const uptime = useMemo(() => {
    if (!showUptime || !results?.length)
      return {
        percentage: '0%',
        details: '',
      };

    // we count uptime based on success and failure statuses, as indecisive might mean
    // that an unrelated package is broken, or CI failed for another reason, so it can pollute the actual uptime
    const filteredResults = results.filter((result) => (result.ciLink && result.status === 'failure') || result.status === 'success');
    const successCount = filteredResults.filter((result) => result.status === 'success').length;
    const percentage = ((successCount / filteredResults.length) * 100).toFixed(2) + '%';

    const details = ['failure', 'indecisive', 'no-data'].reduce((acc, status) => {
      const count = filteredResults.filter((result) => result.status === status).length;

      if (count === 0) return acc;

      const frequency = ((count / filteredResults.length) * 100).toFixed(2);

      return `${acc} ● ${status}: ${frequency}%`;
    }, `success: ${percentage}%`);

    return {
      details,
      percentage,
    };
  }, [results, showUptime]);

  // Not that it will ever happen, but just in case so we don't break the website because of malformed data.
  if (!results?.length) {
    return <div>There was a problem processing this data. Please try again later.</div>;
  }

  const mostRecentResult = results.at(-1);
  const mostRecentStatus = mostRecentResult?.status || 'no-data';

  // by default width is 0, so we assume the default view which is 90 days. Will look weird on mobile but 🤷
  const daysToDisplay = width === 0 || width >= 850 ? 90 : width >= 600 ? 60 : 30;
  const shouldShowActionButtons = daysToDisplay > 30;

  const infoToDisplay = selectedHeartBeat && (hoveredHeartBeat || selectedHeartBeat);

  const resultsToDisplay = results.slice(-daysToDisplay);

  return (
    <ResultBox ref={chartRef} className="result-box" isFailure={infoToDisplay?.status === 'failure'}>
      <article>
        <ResultHeading>
          <StatusBadge style={{ marginBottom: '2px' }} status={mostRecentStatus}></StatusBadge>
          <TemplateName>{config?.name ?? id}</TemplateName>
          {shouldShowActionButtons && config && (
            <HelperTooltip script={config?.script} reproScript={reproScript} expected={config?.expected} />
          )}
          {shouldShowActionButtons && (
            <ExpandCollapseButton isButton onClick={() => setSelectedHeartBeat(selectedHeartBeat ? undefined : mostRecentResult)}>
              {selectedHeartBeat ? 'Collapse' : 'Expand'}
            </ExpandCollapseButton>
          )}
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
                onClick={() => setSelectedHeartBeat(selectedHeartBeat === result ? undefined : result)}
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
      {showUptime && (
        <UptimeContainer>
          <div>
            <StyledSpan>{daysToDisplay}</StyledSpan> days ago
          </div>
          <Spacer />
          <WithTooltip hasChrome={false} placement="bottom" tooltip={<TooltipNote note={uptime.details} />} aria-label={uptime.details}>
            <StyledSpan>{uptime.percentage} uptime</StyledSpan>
          </WithTooltip>
          <Spacer />
          <StyledSpan>Today</StyledSpan>
        </UptimeContainer>
      )}
    </ResultBox>
  );
});
