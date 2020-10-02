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
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => setElement(e)}
      />
    </ElementContainer>
  );
};

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
