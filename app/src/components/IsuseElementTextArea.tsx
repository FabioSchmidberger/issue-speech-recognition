import React from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

interface Props {
  name: string;
  value: string;
  setElement: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const IssueElementTextArea: React.FC<Props> = ({ name, setElement, value }) => {
  return (
    <ElementContainer>
      <Label>{name}</Label>
      <Input name={name} value={value} onChange={(e) => setElement(e)} />
    </ElementContainer>
  );
};

const Input = styled(TextareaAutosize)`
  font-size: 22px;
  line-height: 1.7;
  padding: 7px;
  border-width: 0px;
  color: black;
  background-color: white;
  border-radius: 5px;
  width: inherit;
  height: fit-content;
  font-family: Roboto;
`;

const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 25px;
  width: 100%;
`;

const Label = styled.div`
  font-size: 20px;
  padding-bottom: 10px;
  width: 150px;
  font-weight: bold;
`;

export default IssueElementTextArea;
