import React from 'react';
import styled from "styled-components"
import NLP from './models/NLP';

interface Props {
  name: string
}

const IssueElement: React.FC<Props> = ({name}) => {
  return (
    <ElementContainer>
      <Label>{name}</Label>
      <input type="text" name={name}/>
    </ElementContainer>
  )
}

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

export default IssueElement;