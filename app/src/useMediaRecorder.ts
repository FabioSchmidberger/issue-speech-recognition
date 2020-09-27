import { useEffect, useState } from "react";
import Recorder from 'opus-recorder';

declare var MediaRecorder: any;

function useMediaRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState<
    typeof MediaRecorder | null
  >(null);
  const [isRecording, setIsRecording] = useState(false);
  const [chunks, setChunks] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        try {
          const mediaRecorder = new Recorder({
            numberOfChannels: 1,
            encoderSampleRate: 16000,
            originalSampleRateOverride: 16000,
            encoderPath: 'waveWorker.min.js',
            wavBitDepth: 16,
          });
          mediaRecorder.ondataavailable = (chunk: any) => {
            setChunks((chunks) => [...chunks, chunk]);
          };
          setMediaRecorder(mediaRecorder);
          // visualize(stream);
        } catch (error) {
          console.log('The following getUserMedia error occured: ' + error);
        }
      } else {
        console.log('getUserMedia not supported on your browser!');
      }
    })();
  }, []);

  return {
    isRecording,
    chunks,
    start: () => {
      mediaRecorder.start();
      setIsRecording(true);
    },
    stop: () => {
      mediaRecorder.stop();
      setIsRecording(false);
    },
    reset: () => setChunks([]),
  }
}

export default useMediaRecorder;
