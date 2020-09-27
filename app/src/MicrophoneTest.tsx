import React, { useEffect, useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { blobToDataURL } from 'blob-util';
import {
  FiMic,
  FiSquare,
  FiChevronsRight,
  FiSkipForward,
  FiAlertCircle,
  FiPlay,
  FiTrash,
} from 'react-icons/fi';
import useMediaRecorder from './useMediaRecorder';


const MicrophoneTest: React.FC = () => {
  const { start, stop, chunks, isRecording, reset } = useMediaRecorder();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [error, setError] = useState('');
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const [audioDataURL, setAudioDataURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  useEffect(() => {
    const processChunks = async () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      console.log(blob)
      setAudioBlob(blob);
      const audioURL = await blobToDataURL(blob);
      setAudioDataURL(audioURL);
      reset();
    };

    if (!isRecording && chunks.length > 0) {
      processChunks();
    }
  }, [isRecording, chunks, reset]);

  const handleRecordClick = async () => {
    if (isRecording) {
      stop();
    } else {
      console.log("Start")
      start();
      setAudioBlob(null);
      setAudioDataURL(null);
    }
  };

  const hasRecording = !!audioDataURL;

  return (
    <>
      <ButtonContainer style={{ display: hasRecording ? 'none' : 'flex' }}>
      
        <RecordButton
          onClick={handleRecordClick}
          isRecording={isRecording}
          hasRecording={hasRecording}
        >
          {isRecording ? <FiSquare /> : <FiMic />}
        </RecordButton>
      </ButtonContainer>
      {true && (
        <Toolbar>
          <audio controls={false} ref={audioRef} src={audioDataURL || ''} />
          <ToolbarButton
            onClick={() => {
              audioRef.current?.play();
              setAudioIsPlaying(true);
              audioRef.current?.addEventListener('ended', () => {
                setAudioIsPlaying(false);
              });
            }}
          >
            {audioIsPlaying ? <FiSquare /> : <FiPlay />}
            <span>{audioIsPlaying ? 'Stop' : 'Abspielen'}</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              setAudioBlob(null);
              setAudioDataURL(null);
              reset();
            }}
          >
            <FiTrash />
            <span>Verwerfen</span>
          </ToolbarButton>
        </Toolbar>
      )}
      </>
  );
};

export const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  align-self: center;
  padding: 8px 14px;
  font-size: 14px;
  border: 2px solid hsl(200, 10%, 90%);

  span + svg {
    margin-left: 6px;
  }

  svg + span {
    margin-left: 8px;
  }
`;

const ButtonContainer = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 500px;
  height: 100px;
`;


const RecordButton = styled.button`
  align-self: center;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-size: 40px;
  background-color: ${(props: {
    isRecording: boolean;
    hasRecording: boolean;
  }) =>
    props.isRecording
      ? 'hsl(0, 100%, 60%)'
      : props.hasRecording
      ? 'white'
      : 'hsl(200, 100%, 60%)'};
  color: ${(props: { isRecording: boolean; hasRecording: boolean }) =>
    props.hasRecording ? 'black' : 'white'};
  transition: transform 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

const ToolbarButton = styled(Button)`
  & + & {
    margin-left: 6px;
  }
`;

const Toolbar = styled.div`
  display: flex;
`;

export default MicrophoneTest;
