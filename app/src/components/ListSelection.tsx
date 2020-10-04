import React from 'react';
import styled from 'styled-components';

interface Props {
  name: string;
  elements: string[];
}

const ListSelection: React.FC<Props> = ({ name, elements }) => {
  return (
    <ListContainer>
      <Label>{name}</Label>

      <ElementsContainer>
        {elements.map((element) => (
          <Element key={element}>{element}</Element>
        ))}
      </ElementsContainer>
    </ListContainer>
  );
};

const Element = styled.div`
  font-size: 20px;
  padding: 5px 10px;
  border-width: 0px;
  color: black;
  border-radius: 5px;
  background-color: lightblue;
  margin-right: 5px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Label = styled.div`
  font-size: 20px;
  padding-right: 10px;
  width: 150px;
  font-weight: bold;
`;

export default ListSelection;
