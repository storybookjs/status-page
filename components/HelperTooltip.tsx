import { Icon, WithTooltip, styles, Highlight, CodeSnippets } from '@storybook/design-system';
import { styled } from '@storybook/theming';
import { TemplateConfig } from '~/model/types';

const Title = styled.div`
  ${styles.text.regularBold}
  color: ${styles.color.darkest};
`;

const Description = styled.div`
  ${styles.text.regular}
  color: ${styles.color.darkest};
`;

const Wrapper = styled.div`
  ${styles.text.small};
  color: ${styles.color.darkest};
  text-decoration: none;
  display: flex;
  align-items: flex-start;
  padding-top: 12px;
  svg {
    flex: 0 0 auto;
    width: 20px;
    height: 20px;
    margin-right: 15px;
    margin-top: 4px;
  }
`;

const ContentWrapper = styled.div`
  min-width: 0;
  flex: 1 1 auto;
`;

const ItemWithIconAndDescription = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}) => (
  <Wrapper>
    {icon}
    <ContentWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </ContentWrapper>
  </Wrapper>
);

const StyledCodeSnippets = styled(CodeSnippets)<{ hideCopy?: boolean }>`
  padding-top: 12px;
  > div {
    box-shadow: none;
  }

  > * button {
    display: ${(props) => (props.hideCopy ? 'none' : 'inline-block')};
  }
`;

const ColoredIcon = styled(Icon)<{ color: string }>`
  color: ${(props) => props.color};
`;

const TooltipWrapper = styled.div`
  padding: 12px 12px 12px 18px;
  max-width: 90vw;
`;

export const HelperTooltip = ({ script, expected }: Pick<TemplateConfig, 'script' | 'expected'>) => {
  const configurationBody = (
    <>
      <div>The following libraries were used in this build.</div>
      <StyledCodeSnippets
        snippets={[
          { id: '1', renderTabLabel: () => '', Snippet: () => <Highlight language="json">{JSON.stringify(expected, null, 2)}</Highlight> },
        ]}
        hideCopy
      ></StyledCodeSnippets>
    </>
  );

  const buildScriptBody = (
    <>
      <div>To reproduce the results of this test, run the following script from the Storybook repository.</div>
      <StyledCodeSnippets
        snippets={[{ id: '1', renderTabLabel: () => '', Snippet: () => <Highlight language="bash">{script}</Highlight> }]}
      ></StyledCodeSnippets>
    </>
  );

  return (
    <WithTooltip
      trigger="click"
      closeOnClick
      tooltip={() => {
        return (
          <TooltipWrapper>
            <ItemWithIconAndDescription
              icon={<ColoredIcon icon="beaker" color="#66BF3C" />}
              title="Configuration"
              description={configurationBody}
            />
            <ItemWithIconAndDescription
              icon={<ColoredIcon icon="markup" color="#37D5D3" />}
              title="Build script"
              description={buildScriptBody}
            />
          </TooltipWrapper>
        );
      }}
    >
      <ColoredIcon icon="question" color="var(--text-secondary)" />
    </WithTooltip>
  );
};
