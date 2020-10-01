import React from 'react';
import styled from "styled-components"
import IssueElement from './IssueElement';
import NLP from './models/NLP';

interface Props {
  text: string;
  nlp: NLP | undefined;
}

const IssueCard: React.FC<Props> = ({text, nlp}) => {
  return (
    <IssueContainer>
      <Title>New Issue</Title>
      <IssueElement name="Title"/>
      <IssueElement name="Description"/>
      <IssueElement name="Assignee"/>
      <IssueElement name="Components"/>
      <IssueElement name="Labels"/>
      <IssueElement name="Weight"/>
      {text}
      <SaveButton>Save</SaveButton>
    </IssueContainer>
  )
}

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