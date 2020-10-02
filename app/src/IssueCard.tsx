import React, { useState } from 'react';
import styled from 'styled-components';
import IssueElement from './components/IssueElement';
import Issue from './models/Issue';

interface Props {
  issue: Issue;
  setIssue: (issue: Issue) => void;
}

const IssueCard: React.FC<Props> = ({ issue, setIssue }) => {
  return (
    <IssueContainer>
      <Title>New Issue</Title>
      <IssueElement
        name="Title"
        value={issue.title}
        setElement={(e) => setIssue({ ...issue, title: e.target.value })}
      />
      <IssueElement
        name="Description"
        value={issue.description}
        setElement={(e) => setIssue({ ...issue, description: e.target.value })}
      />
      <IssueElement
        name="Assignee"
        value={issue.assignee}
        setElement={(e) => setIssue({ ...issue, assignee: e.target.value })}
      />
      <IssueElement
        name="Components"
        value={issue.components}
        setElement={(e) => setIssue({ ...issue, components: e.target.value })}
      />
      <IssueElement
        name="Labels"
        value={issue.lables}
        setElement={(e) => setIssue({ ...issue, lables: e.target.value })}
      />
      <IssueElement
        name="Weight"
        type="number"
        value={issue.weight.toString()}
        setElement={(e) =>
          setIssue({ ...issue, weight: parseInt(e.target.value) })
        }
      />
      <SaveButton>Save</SaveButton>
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

const ElementContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const Label = styled.div`
  font-size: 20px;
  padding-right: 10px;
  width: 150px;
`;

export default IssueCard;
