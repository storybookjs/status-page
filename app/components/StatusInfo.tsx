import { memo } from 'react';
import type { TestResult, Feature as TFeature } from '~/model/types';
import { getFormattedDate } from '~/util';
import { Icon } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { Link } from './Link';

const StatusInfoWrapper = styled.article`
  display: grid;
  flex-direction: row;
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--text-primary);
  gap: 0.25rem;
  padding: 0.75rem;
`;

const FeaturesBlockWrapper = styled.div`
  display: grid;
  margin-top: 0.5rem;
  gap: 0.25rem;
  & > * {
    background: var(--background-secondary);
    padding: 0.5rem;
  }
`;

const Feature = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  & svg {
    color: var(--status-failure);
  }

  &.unsupported svg {
    color: var(--status-unsupported);
  }
`;

export const StatusInfo = memo((result: TestResult) => {
  const day = getFormattedDate(result.date);

  const templateLink =
    result.ciLink != null ? (
      <div className="template-link">
        See{' '}
        <Link href={result.ciLink} target="_blank">
          pipeline
        </Link>{' '}
        in CI
      </div>
    ) : null;

  if (result.status === 'no-data') {
    return (
      <StatusInfoWrapper>
        <div className="template-date">{day}</div>
        <div>There is no data for this day</div>

        {templateLink}
      </StatusInfoWrapper>
    );
  }

  const { storybookVersion, features, status } = result;
  return (
    <StatusInfoWrapper>
      <div className="template-date">{day}</div>
      <>
        {status === 'indecisive' && <div>There are inconclusive results for this day</div>}
        <div className="template-name">Storybook version: {storybookVersion}</div>
        {templateLink}
        <FeaturesBlock features={features} />
      </>
    </StatusInfoWrapper>
  );
});

export const FeaturesBlock = ({ features }: { features: TFeature[] }) => {
  if (features.length === 0) {
    return null;
  }

  return (
    <FeaturesBlockWrapper>
      {features
        .filter(({ status }) => status === 'failure' || status === 'unsupported')
        .map(({ name, status }) => (
          <Feature key={name} className={status}>
            <Icon icon={status === 'unsupported' ? 'subtract' : 'close'} />
            <div>{name}</div>
          </Feature>
        ))}
    </FeaturesBlockWrapper>
  );
};
