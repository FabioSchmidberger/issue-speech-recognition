import React from 'react';
import styled from 'styled-components';
import AddElement from './AddElement';
import Element from './Element';

interface Props {
  name: string;
  selectedElements: string[];
  setElements: (elements: string[]) => void;
  availableElements: string[];
}

const ListSelection: React.FC<Props> = ({
  name,
  selectedElements,
  setElements,
  availableElements,
}) => {
  if (!availableElements) return null;

  const deleteElement = (elementToDelete: string) => {
    setElements(
      selectedElements.filter((element) => element != elementToDelete),
    );
  };

  const addElement = (elementToAdd: string) => {
    setElements([...selectedElements, elementToAdd]);
  };

  const optionsToAdd = availableElements.filter(
    (element) => !selectedElements.includes(element),
  );

  return (
    <ListContainer>
      <Label>{name}</Label>
      <ElementsContainer>
        {selectedElements.map((element) => (
          <Element key={element} name={element} onDelete={deleteElement} />
        ))}
        <AddElement onAdd={addElement} options={optionsToAdd} />
      </ElementsContainer>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
`;

const ElementsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;

const Label = styled.div`
  font-size: 20px;
  padding-right: 10px;
  width: 150px;
  font-weight: bold;
`;

export default ListSelection;
