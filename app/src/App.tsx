import React from 'react';
import styled from 'styled-components';
import SettingsScreen from './components/SettingsScreen';
import { useIssueElementsImporter } from './integrations/useIssueElementsImporter';
import SpeechProcessing from './components/SpeechProcessing';

const App: React.FC = () => {
  useIssueElementsImporter();

  return (
    <AppContainer>
      <SettingsScreen />
      <Content>
        <Header>Issue Speech Recognition</Header>
        <SpeechProcessing />
        <Footer>BA - Fabio Schmidberger</Footer>
      </Content>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 30px;
  overflow-y: scroll;
  align-items: center;
`;

const Header = styled.h1``;

const Footer = styled.div`
  margin-top: 100px;
`;

export default App;
