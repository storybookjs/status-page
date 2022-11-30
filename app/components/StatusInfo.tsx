import { memo } from 'react';
import type { TestResult, Feature } from '~/model/types';
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
  text-transform: capitalize;

  & svg {
    color: var(--status-failure);
  }
`;

export const StatusInfo = memo((result: TestResult) => {
  const day = getFormattedDate(result.date);

  if (result.status === 'no-data') {
    return (
      <StatusInfoWrapper>
        <div className="template-date">{day}</div>
        <div>There is no data for this day</div>
      </StatusInfoWrapper>
    );
  }

  const { storybookVersion, features, ciLink, status } = result;
  return (
    <StatusInfoWrapper>
      <div className="template-date">{day}</div>
      <>
        {status === 'indecisive' && <div>There are inconclusive results for this day</div>}
        <div className="template-name">Storybook version: {storybookVersion}</div>
        <div className="template-link">
          See <Link href={ciLink}>pipeline</Link> in CI
        </div>
        {status === 'failure' && <FeaturesBlock features={features} />}
      </>
    </StatusInfoWrapper>
  );
});

export const FeaturesBlock = ({ features }: { features: Feature[] }) => {
  return (
    <FeaturesBlockWrapper>
      {features
        .filter(({ status }) => status === 'failure')
        .map(({ name }) => (
          <Feature key={name}>
            <Icon icon={'cross'} />
            <div>{name}</div>
          </Feature>
        ))}
    </FeaturesBlockWrapper>
  );
};
