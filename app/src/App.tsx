import React from 'react';
import styled from 'styled-components';
import MicrophoneTest from './MicrophoneTest';
import SpeechClass from './SpeechClass';
import SpeechProcessing from './SpeechProcessing';

const App : React.FC = () => {

  return (
    <AppContainer>
      <Header>Issue Speech Recognition</Header>
      <Content>
        <SpeechClass></SpeechClass>
      </Content>
      <Footer>BA - Fabio Schmidberger</Footer>
    </AppContainer>
  )

};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div``;

const Header = styled.h1``;

const Footer = styled.div`margin-top: 100px`;

export default App;