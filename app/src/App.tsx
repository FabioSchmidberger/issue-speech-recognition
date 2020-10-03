import React from 'react';
import styled from 'styled-components';
import { useIssueElementsImporter } from './integrations/useIssueElementsImporter';
import WebSpeech from './WebSpeech';

const App: React.FC = () => {
  useIssueElementsImporter();

  return (
    <AppContainer>
      <Header>Issue Speech Recognition</Header>
      {/*<SpeechClass text={text} setText={setText} nlp={nlp} setNlp={setNlp}/>*/}
      <WebSpeech />
      <Footer>BA - Fabio Schmidberger</Footer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1``;

const Footer = styled.div`
  margin-top: 100px;
`;

export default App;
