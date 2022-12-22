import { Cardinal, styles } from '@storybook/design-system';
import { styled, typography } from '@storybook/theming';
import { getRelativeDate } from '../util';

import { StatusBadge } from './StatusBadge';

const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  padding: var(--spacing-l);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${styles.breakpoint}px) {
    gap: 0.5rem;
  }
`;

const RendererInfo = styled.div`
  display: flex;
  gap: 1rem;
`;

const Name = styled.div`
  font-weight: ${typography.weight.bold};
  font-size: ${typography.size.s3}px;
  line-height: 1;
  margin-bottom: 2px;
  margin-top: 1px;
  float: left;
`;

const Details = styled.div`
  font-size: ${typography.size.s1}px;
  line-height: 1;
  float: left;
  clear: both;
`;

const Metrics = styled.div`
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
`;

const CountWrapper = styled.div<{ isFailure: boolean }>`
  color: ${(props) => (props.isFailure ? 'var(--status-failure)' : 'var(--status-success)')};
`;

type Props = {
  renderer: string;
  status: 'success' | 'failure';
  lastUpdatedAt: Date | string;
  configurationCount?: number;
  featureCount?: number;
  failureCount?: number;
};

export const StatusBar = ({ renderer, status, lastUpdatedAt, configurationCount = 0, featureCount = 0, failureCount = 0 }: Props) => {
  return (
    <Wrapper className="result-box">
      <RendererInfo>
        <StatusBadge large status={status} />
        <div>
          <Name>{renderer}</Name>
          <Details>Updated {getRelativeDate(lastUpdatedAt)} ago</Details>
        </div>
      </RendererInfo>
      <Metrics>
        <Cardinal noPlural={configurationCount === 1} size="small" count={configurationCount} text="Configuration" />
        <Cardinal noPlural={featureCount === 1} size="small" count={featureCount} text="Feature" />
        <Cardinal
          noPlural={failureCount === 1}
          size="small"
          count={failureCount}
          text="Failure"
          CountWrapper={(props) => <CountWrapper isFailure={failureCount > 0} {...props} />}
        />
      </Metrics>
    </Wrapper>
  );
};
