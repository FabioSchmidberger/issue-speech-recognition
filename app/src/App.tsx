import React, { useState } from 'react';
import styled from 'styled-components';
import IssueCard from './IssueCard';
import NLP from './models/NLP';
import SpeechClass from './SpeechClass';
import WebSpeech from './WebSpeech';

const App : React.FC = () => {

  const [text, setText] = useState("");
  const [nlp, setNlp] = useState<NLP | undefined>(undefined);


  return (
    <AppContainer>
      <Header>Issue Speech Recognition</Header>
      <Content>
        {/*<SpeechClass text={text} setText={setText} nlp={nlp} setNlp={setNlp}/>*/}
        <WebSpeech></WebSpeech>
        <IssueCard text={text} nlp={nlp}/>
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

const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

const Header = styled.h1``;

const Footer = styled.div`margin-top: 100px`;

export default App;