import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import postProcessText from './speechPostProcessing';

function useWebSpeech() {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  }

  const options = { continuous: true, language: 'en-US' };

  const startRecording = () => {
    SpeechRecognition.startListening(options);
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
  };

  return {
    transcript: postProcessText(transcript),
    listening,
    startRecording,
    stopRecording,
    resetSpeech: resetTranscript,
  };
}

export default useWebSpeech;
