import { memo } from 'react';
import type { TestResult } from '../model/types';
import { getFormattedDate } from '../util';
import { Icon } from '@storybook/design-system';
import './StatusInfo.css';
import { Link } from './Link';

export const StatusInfo = memo(({ storybookVersion, date, ciLink, features, status }: TestResult) => {
  const day = getFormattedDate(date);

  return (
    <article className="status-info">
      <div className="template-date">{day}</div>
      {status === 'no-data' ? (
        <div>There is no data for this day</div>
      ) : (
        <>
          {status === 'indecisive' && <div>There are inconclusive results for this day</div>}
          <div className="template-name">Storybook version: {storybookVersion}</div>
          <div className="template-link">
            See <Link href={ciLink}>pipeline</Link> in CI
          </div>
          {status === 'failure' && <FeaturesBlock features={features} />}
        </>
      )}
    </article>
  );
});

export const FeaturesBlock = ({ features }: { features: TestResult['features'] }) => {
  return (
    <div className="features-block">
      {features
        .filter(({ status }) => status === 'failure')
        .map(({ name }) => (
          <div key={name} className="feature">
            <Icon icon={'cross'} />
            <div>{name}</div>
          </div>
        ))}
    </div>
  );
};
