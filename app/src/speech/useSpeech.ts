import { SpeechEngine, useSettings } from '../state/settingsReducer';
import useWebSpeech from './useWebSpeech';

function useSpeech() {
  const { speechEngine } = useSettings();
  const webspeech = useWebSpeech();

  if (speechEngine === SpeechEngine.GOOGLE) return webspeech;

  return webspeech;
}

export default useSpeech;
