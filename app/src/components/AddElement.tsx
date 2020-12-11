import React, { useState } from 'react';
import styled from 'styled-components';
import { RiAddFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import Options from './Options';

interface Props {
  options: string[];
  onAdd: (element: string) => void;
}

const AddElement: React.FC<Props> = ({ options, onAdd }) => {
  const [shouldDisplayOptions, setshouldDisplayOptions] = useState(false);

  return (
    <Container>
      {shouldDisplayOptions && (
        <Options
          options={options}
          addOption={(option) => {
            onAdd(option);
            setshouldDisplayOptions(false);
          }}
        />
      )}
      <RiAddFill
        onClick={() => setshouldDisplayOptions(!shouldDisplayOptions)}
      />
    </Container>
  );
};

const Container = styled.div`
  font-size: 20px;
  padding: 5px 10px;
  border-width: 0px;
  color: black;
  border-radius: 5px;
  background-color: lightblue;
  margin-right: 5px;
`;

export default AddElement;
