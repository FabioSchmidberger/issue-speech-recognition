import React from 'react';
import styled from 'styled-components';
import TextWithMarkings from './TextWithMarkings';
import IssueCard from './IssueCard';
import useIssueParser from '../nlp/useIssueParser';
import useNLP from '../nlp/useNLP';
import useSpeech from '../speech/useSpeech';

const SpeechProcessing: React.FC = () => {
  const {
    transcript,
    listening,
    startRecording,
    stopRecording,
    resetSpeech,
  } = useSpeech();

  const shouldRunNlp = !listening && !!transcript;
  const { nlp, resetNlp } = useNLP(transcript, shouldRunNlp);

  const { issue, setIssue } = useIssueParser(nlp);

  const reset = () => {
    resetSpeech();
    resetNlp();
  };

  console.log('Transcript: ' + transcript);

  return (
    <Content>
      <SpeechContainer>
        <TextWithMarkings text={transcript} nlp={nlp} isRecording={listening} />
        <div>
          {!listening ? (
            <StartButton onClick={startRecording}>Start Recording</StartButton>
          ) : (
            <StopButton onClick={stopRecording}>Stop Recording</StopButton>
          )}
          <StopButton onClick={reset}>Reset</StopButton>
        </div>
      </SpeechContainer>
      <IssueCard issue={issue} setIssue={setIssue} />
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

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

export default SpeechProcessing;
