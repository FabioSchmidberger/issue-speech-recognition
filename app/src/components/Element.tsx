import React from 'react';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';

interface Props {
  name: string;
  onDelete: (element: string) => void;
}

const Element: React.FC<Props> = ({ name, onDelete }) => {
  return (
    <Container>
      <CloseIcon>
        <AiFillCloseCircle onClick={() => onDelete(name)} />
      </CloseIcon>

      <Text>{name}</Text>
    </Container>
  );
};

const CloseIcon = styled.div`
  position: relative;
  top: -10px;
  right: 0px;
  font-size: 20px;
  padding: 0px;
`;

const Text = styled.div`
  font-size: 20px;
`;

const Container = styled.div`
  padding: 5px 10px;
  border-width: 0px;
  color: black;
  border-radius: 5px;
  background-color: lightblue;
  margin-right: 5px;
  line-height: 1;
`;

export default Element;
