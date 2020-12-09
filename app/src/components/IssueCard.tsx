import React from 'react';
import styled from 'styled-components';
import IssueElement from './IssueElement';
import IssueElementTextArea from './IsuseElementTextArea';
import ListSelection from './ListSelection';
import { useIntegration } from '../integrations/integrationAdapter';
import Issue from '../models/Issue';
import { useIssueElementLists } from '../state/IssueElementsReducer';

interface Props {
  issue: Issue;
  setIssue: (issue: Issue) => void;
}

const IssueCard: React.FC<Props> = ({ issue, setIssue }) => {
  const integration = useIntegration();
  const issueElementLists = useIssueElementLists();

  const handleSave = () => {
    integration.createIssue(issue);
    integration.getLabels();
  };

  return (
    <IssueContainer>
      <Title>New Issue</Title>
      <IssueElementTextArea
        name="Title"
        value={issue.title}
        setElement={(e) => setIssue({ ...issue, title: e.target.value })}
      />
      <IssueElementTextArea
        name="Body"
        value={issue.body}
        setElement={(e) => setIssue({ ...issue, body: e.target.value })}
      />
      <ListSelection
        name="Components"
        selectedElements={issue.components}
        availableElements={issueElementLists.components}
        setElements={(components) =>
          setIssue({ ...issue, components: components })
        }
      />
      <ListSelection
        name="Labels"
        selectedElements={issue.labels}
        availableElements={issueElementLists.labels}
        setElements={(labels) => setIssue({ ...issue, labels: labels })}
      />
      <ListSelection
        name="Assignees"
        selectedElements={issue.assignees}
        availableElements={issueElementLists.assignees}
        setElements={(assignees) =>
          setIssue({ ...issue, assignees: assignees })
        }
      />
      <ListSelection
        name="Priority"
        selectedElements={issue.priority}
        availableElements={issueElementLists.priorities}
        setElements={(priority) => setIssue({ ...issue, priority: priority })}
      />
      <IssueElement
        name="Weight"
        type="number"
        value={issue.weight.toString()}
        setElement={(e) =>
          setIssue({ ...issue, weight: parseInt(e.target.value) })
        }
      />
      <Buttons>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </Buttons>
    </IssueContainer>
  );
};

const IssueContainer = styled.div`
  padding: 30px;
  margin: 20px;
  width: 700px;
  min-height: 400px;
  line-height: 2;
  border-radius: 20px;
  background-color: hsl(200, 10%, 95%);
`;

const SaveButton = styled.button`
  font-size: 20px;
  border-width: 0px;
  padding: 7px 12px;
  border-radius: 5px;
  background-color: green;
  color: white;
  transition: transform 0.2s;
  &:active {
    transform: scale(0.98);
  }
  margin-top: 40px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Title = styled.div`
  font-size: 25px;
`;

export default IssueCard;
