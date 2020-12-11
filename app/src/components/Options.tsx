import React from 'react';
import styled from 'styled-components';

interface Props {
  options: string[];
  addOption: (element: string) => void;
}

const Options: React.FC<Props> = ({ options, addOption }) => {
  return (
    <Container>
      {options.map((option) => (
        <Option key={option} onClick={() => addOption(option)}>
          {option}
        </Option>
      ))}
    </Container>
  );
};

const Option = styled.div``;

const Container = styled.div`
  font-size: 20px;
  padding: 5px 10px;
  border-width: 0px;
  color: black;
  border-radius: 5px;
  background-color: lightblue;
  margin-right: 5px;
`;

export default Options;
