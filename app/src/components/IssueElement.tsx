import React from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  value: string;
  setElement: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const IssueElement: React.FC<Props> = ({
  name,
  setElement,
  value,
  type = 'text',
}) => {
  return (
    <ElementContainer>
      <Label>{name}</Label>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={(e) => setElement(e)}
      />
    </ElementContainer>
  );
};

const Input = styled.input`
  font-size: 20px;
  padding: 12px 20px;
  border-width: 0px;
  color: black;
  background-color: white;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 100px;
  }
`;

const ElementContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.div`
  font-size: 20px;
  padding-right: 10px;
  width: 150px;
  font-weight: bold;
`;

export default IssueElement;
