import React, { useState } from 'react';
import styled from "styled-components"
import RecordingButton from './components/RecordingButton';

interface Props {

}

const SpeechProcessing: React.FC<Props> = ({}) => {

  const [isRecording, setIsRecording] = useState(false)

  const handleRecordingClick = () => {
    setIsRecording(!isRecording)
  }

  return (
    <div>
      <RecordingButton isRecording={isRecording} handleClick={handleRecordingClick}/>
    </div>
  )
}

export default SpeechProcessing;
