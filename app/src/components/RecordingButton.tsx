import React from 'react';
import styled from "styled-components"

interface Props {
  isRecording: boolean
  handleClick: () => void
}

const RecordingButton: React.FC<Props> = ({isRecording, handleClick}) => {
  return (
    <RecordingButtonContainer isRecording={isRecording} onClick={handleClick}>
      <ButtonText>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </ButtonText>
    </RecordingButtonContainer>
  )
}



const RecordingButtonContainer = styled.button`
  border-width: 0px;
  padding: 20px;
  border-radius: 5px;
  background-color: ${(props: {
    isRecording: boolean
  }) =>
    props.isRecording
      ? 'hsl(0, 100%, 60%)'
      : 'hsl(200, 100%, 60%)'};
  color: ${(props: { isRecording: boolean }) =>
   'white'};
  transition: transform 0.2s;
  &:active {
    transform: scale(0.98);
  }
`;

const ButtonText = styled.div`
  size: 15px;
`;

export default RecordingButton;