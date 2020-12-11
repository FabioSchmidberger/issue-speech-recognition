import React from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import postProcessText from './speechPostProcessing';

function useWebSpeech() {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  console.log('Transcript: ' + transcript);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  }

  const options = { continuous: true, language: 'en-US' };

  const startRecording = () => {
    SpeechRecognition.startListening(options);
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
  };

  let exampleText =
    'The admin login returns CORS errors. Add label bug and assign Jake. This has high priority.';
  //'Add a monitoring system to our server. This is for components payment and the logging-service. Assign Fabio and add label enhancement. The weight is 7 and the priority is high.';

  return {
    transcript: postProcessText(transcript),
    //transcript: exampleText,
    listening,
    startRecording,
    stopRecording,
    resetSpeech: resetTranscript,
  };
}

export default useWebSpeech;
