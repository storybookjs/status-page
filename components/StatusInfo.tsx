import { ComponentProps, memo } from 'react';
import type { TestResult } from '~/model/types';
import { getFormattedDate } from '~/util/index';
import { Icon, styles } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { Link } from './Link';
import { StatusBadge } from './StatusBadge';

const HeartBeatDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--text-primary);
  gap: var(--spacing-s);
  min-height: 180px;
`;

const StyledIcon = styled(Icon)`
  color: var(--text-secondary);
`;

const StatusInfoWrapper = styled.article`
  display: flex;
  gap: 25px;

  @media (max-width: ${styles.breakpoint}px) {
    flex-direction: column;
    gap: 0;
  }
`;

const IconLabelWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const FeatureStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: var(--spacing-s);
`;

const FeatureName = styled.div`
  text-transform: capitalize;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(315px, 1fr));

  @media (max-width: ${styles.breakpoint}px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
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
        <div>There is no data for this day</div>
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
                <StatusBadge status={feature.status}></StatusBadge>
                <FeatureName>{feature.name.replace('addon-', '').replace('docs/', '').trim()}</FeatureName>
              </FeatureStatus>
            );
          })}
        </FeatureGrid>
      )}
    </HeartBeatDetails>
  );
});
