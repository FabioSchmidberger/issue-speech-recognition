import React from 'react';
import styled from 'styled-components';
import IssueElement from './components/IssueElement';
import IssueElementTextArea from './components/IsuseElementTextArea';
import ListSelection from './components/ListSelection';
import { useIntegration } from './integrations/integrationAdapter';
import Issue from './models/Issue';

interface Props {
  issue: Issue;
  setIssue: (issue: Issue) => void;
}

const IssueCard: React.FC<Props> = ({ issue, setIssue }) => {
  const integration = useIntegration();

  const handleSave = () => {
    integration.createIssue(issue);
    integration.getLabels();
  };

  return (
    <IssueContainer>
      <Title>New Issue</Title>
      <IssueElement
        name="Title"
        value={issue.title}
        setElement={(e) => setIssue({ ...issue, title: e.target.value })}
      />
      <IssueElementTextArea
        name="Body"
        value={issue.body}
        setElement={(e) => setIssue({ ...issue, body: e.target.value })}
      />
      <ListSelection name="Components" elements={issue.components} />
      <ListSelection name="Labels" elements={issue.labels} />
      <ListSelection name="Assignees" elements={issue.assignees} />
      <IssueElement
        name="Weight"
        type="number"
        value={issue.weight.toString()}
        setElement={(e) =>
          setIssue({ ...issue, weight: parseInt(e.target.value) })
        }
      />
      <SaveButton onClick={handleSave}>Save</SaveButton>
    </IssueContainer>
  );
};

const IssueContainer = styled.div`
  padding: 50px;
  margin: 20px;
  width: 500px;
  min-height: 400px;
  line-height: 2;
  border-radius: 20px;
  background-color: hsl(200, 10%, 95%);
`;

const SaveButton = styled.button`
  font-size: 20px;
  border-width: 0px;
  padding: 20px;
  border-radius: 5px;
  background-color: green;
  color: white;
  transition: transform 0.2s;
  &:active {
    transform: scale(0.98);
  }
  margin-top: 40px;
`;

const Title = styled.div`
  font-size: 25px;
`;

export default IssueCard;
