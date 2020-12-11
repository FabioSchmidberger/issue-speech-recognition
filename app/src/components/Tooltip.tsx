import React from 'react';
import styled from "styled-components"

interface Props {
  text: string
}

const Tooltip: React.FC<Props> = ({text}) => {
  return (
    <TooltipContainer>
      <Text>{text}</Text>
    </TooltipContainer>
  )
}

const TooltipContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const Text = styled.div`
  font-size: 13px;
  padding-right: 10px;
`;

export default Tooltip;