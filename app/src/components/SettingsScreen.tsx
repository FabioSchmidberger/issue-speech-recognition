import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSettings, FiX } from 'react-icons/fi';
import {
  SpeechEngine,
  IssueIntegration,
  useSettings,
} from '../state/settingsReducer';
import { useDispatch } from 'react-redux';
import GithubIntegrationOptions from './GithubIntegrationOptions';

const speechOptions = [SpeechEngine.GOOGLE, SpeechEngine.DEEPSPEECH];

const integrationOptions = [
  IssueIntegration.GITHUB,
  IssueIntegration.CCIMS,
  IssueIntegration.NOOP,
];

const SettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { speechEngine, issueIntegration } = useSettings();
  const [shouldDisplaySettings, setShouldDisplaySettings] = useState(false);

  return (
    <>
      {shouldDisplaySettings ? (
        <SettingsContainer>
          <SettingsIcon>
            <FiX onClick={() => setShouldDisplaySettings(false)} />
          </SettingsIcon>
          <Title>Settings</Title>
          <Section>
            <SectionTitle>Speech</SectionTitle>
            <SelectionList>
              {speechOptions.map((speechOption) => (
                <SelectionElement
                  onClick={() =>
                    dispatch({
                      type: 'SET_SPEECHENGINE',
                      speechEngine: speechOption,
                    })
                  }
                  isSelected={speechOption === speechEngine}
                  disabled={speechOption === SpeechEngine.DEEPSPEECH}
                >
                  {speechOption}
                </SelectionElement>
              ))}
            </SelectionList>
          </Section>
          <Section>
            <SectionTitle>Issue Management System Integration</SectionTitle>
            <SelectionList>
              {integrationOptions.map((integrationOption) => (
                <SelectionElement
                  onClick={() =>
                    dispatch({
                      type: 'SET_ISSUEINTEGRATION',
                      issueIntegration: integrationOption,
                    })
                  }
                  isSelected={integrationOption === issueIntegration}
                >
                  {integrationOption}
                </SelectionElement>
              ))}
            </SelectionList>
            {issueIntegration === IssueIntegration.GITHUB && (
              <GithubIntegrationOptions />
            )}
          </Section>
          <Section>
            <Button onClick={() => dispatch({ type: 'PURGE' })}>
              Reset All
            </Button>
          </Section>
        </SettingsContainer>
      ) : (
        <SettingsIcon>
          <FiSettings onClick={() => setShouldDisplaySettings(true)} />
        </SettingsIcon>
      )}
    </>
  );
};

const Title = styled.div`
  font-size: 25px;
  padding: 30px;
`;

const Section = styled.div`
  padding: 30px;
  border: 1px solid hsl(200, 10%, 90%);
`;

const SectionTitle = styled.div`
  font-size: 20px;
  padding-bottom: 10px;
`;

const SettingsIcon = styled.button`
  font-size: 30px;
  margin: 30px;
  background-color: white;
  border: none;
  height: 30px;
`;

const SelectionElement = styled.button`
  justify-content: 'space-between';
  flex-direction: 'row';
  padding: 14px 20px;
  align-items: 'center';
  border-style: solid;
  border-right-width: 1;
  border-color: hsl(200, 10%, 93%);
  background-color: ${(props: { isSelected: boolean }) =>
    props.isSelected ? 'lightblue' : 'white'};
  flex: 1;
  border-radius: 5px;
`;

const Button = styled.button`
  font-size: 15px;
  border-width: 0px;
  padding: 15px;
  border-radius: 5px;
  background-color: grey;
  color: white;
  transition: transform 0.2s;
  &:active {
    transform: scale(0.98);
  }
  margin-top: 40px;
`;

const SelectionList = styled.div`
  flex-direction: row;
  border-top-width: 1;
  border-bottom-width: 1;
  border-color: hsl(200, 10%, 93%);
`;

const SettingsContainer = styled.div`
  background-color: white;
  height: 100%;
  width: 400px;
  border-right: 3px solid hsl(200, 10%, 90%);
`;

export default SettingsScreen;
