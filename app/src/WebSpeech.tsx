import React, { useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import styled from 'styled-components';
import TextWithMarkings from './components/TextWithMarkings';
import useNLP from './useNLP';

const WebSpeech: React.FC = () => {
  const { transcript, finalTranscript, listening, resetTranscript } = useSpeechRecognition();
  const [isRecording, setIsRecording] = useState(false);

  console.log("Transcript: " + transcript);
  console.log("Final Transcript: " + finalTranscript);

  const shouldRunNlp = !isRecording && !!transcript && transcript === finalTranscript;

  const {nlp, resetNlp} = useNLP(finalTranscript, shouldRunNlp);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const options = { continuous: true, language: 'en-US' };

  const startRecording = () => {
    SpeechRecognition.startListening(options);
    setIsRecording(true);
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
    setIsRecording(false);
  }

  const reset = () =>{
    resetTranscript();
    resetNlp();
  }

  return (
    <SpeechContainer>
      <TextWithMarkings text={transcript} nlp={nlp} />
      <div>
        {!isRecording ? (
          <StartButton onClick={startRecording}>Start Recording</StartButton>
        ) : (
          <StopButton onClick={stopRecording}>
            Stop Recording
          </StopButton>
        )}
        <StopButton onClick={reset}>Reset</StopButton>
      </div>
    </SpeechContainer>
  );
};

const Button = styled.button`
  font-size: 20px;
  border-width: 0px;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  transition: transform 0.2s;
  &:active {
    transform: scale(0.98);
  }
`;

const StartButton = styled(Button)`
  background-color: green;
  color: white;
`;

const StopButton = styled(Button)`
  background-color: hsl(0, 100%, 60%);
  color: white;
`;

const SpeechContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default WebSpeech;
