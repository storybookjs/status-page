import { ComponentProps, memo } from 'react';
import type { TestResult } from '~/model/types';
import { getFormattedDate } from '~/util/index';
import { Icon, styles } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { Link } from './Link';
import { StatusBadge } from './StatusBadge';

const HeartBeatDetails = styled.div`
  display: flex;
  font-size: 14px;
  line-height: 20px;
  flex-direction: column;
  color: var(--text-primary);
  min-height: 140px;
`;

const StyledIcon = styled(Icon)`
  color: var(--text-secondary);
  margin-bottom: 2px;
`;

const StatusInfoWrapper = styled.article`
  display: flex;
  gap: 25px;
  margin-top: 12px;
  margin-bottom: 12px;

  @media (max-width: ${styles.breakpoint}px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const IconLabelWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

const FeatureStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 6px;
`;

const FeatureName = styled.div`
  text-transform: capitalize;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 30px;
  row-gap: 5px;

  @media (max-width: ${styles.breakpoint}px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

const Label = styled.div`
  color: var(--text-primary);
`;

const IconLabel = ({ icon, label }: { icon: ComponentProps<typeof Icon>['icon']; label: string }) => {
  return (
    <IconLabelWrapper>
      <StyledIcon icon={icon} />
      <Label>{label}</Label>
    </IconLabelWrapper>
  );
};

export const StatusInfo = memo((result: TestResult) => {
  const day = getFormattedDate(result.date);

  const templateLink =
    result.ciLink != null ? (
      <div className="template-link">
        <Link href={result.ciLink} target="_blank">
          View build in CI
        </Link>{' '}
      </div>
    ) : null;

  if (result.status === 'no-data') {
    return (
      <HeartBeatDetails>
        <StatusInfoWrapper>
          <IconLabel icon={'calendar'} label={day} />

          {templateLink}
        </StatusInfoWrapper>
        {!templateLink && <div>There is no data for this day.</div>}
        {templateLink && (
          <div>
            No tests run. The build failed before tests could run.{' '}
            <Link href={result.ciLink} target="_blank">
              Check CI to learn more
            </Link>
            .
          </div>
        )}
      </HeartBeatDetails>
    );
  }

  const { storybookVersion, features, status } = result;
  return (
    <HeartBeatDetails>
      <StatusInfoWrapper>
        <IconLabel icon={'calendar'} label={day} />
        {storybookVersion && <IconLabel icon={'storybook'} label={`v${storybookVersion}`} />}
        {templateLink}
      </StatusInfoWrapper>
      {status === 'indecisive' && <div>There are inconclusive results for this day</div>}
      {features && (
        <FeatureGrid>
          {features.map((feature) => {
            return (
              <FeatureStatus key={feature.name}>
                <StatusBadge style={{ marginBottom: '2px' }} status={feature.status}></StatusBadge>
                <FeatureName>{feature.name.replace('addon-', '').replace('-', ' ').replace('docs/', '').trim()}</FeatureName>
              </FeatureStatus>
            );
          })}
        </FeatureGrid>
      )}
    </HeartBeatDetails>
  );
});
