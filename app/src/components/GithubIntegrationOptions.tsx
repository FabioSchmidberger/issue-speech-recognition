import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useSettings } from '../state/settingsReducer';

const GithubIntegrationOptions: React.FC = () => {
  const { githubOptions } = useSettings();
  const dispatch = useDispatch();

  return (
    <Container>
      <Section>
        <Label>Github User Name</Label>
        <Textbox
          value={githubOptions.owner}
          onChange={(e) =>
            dispatch({ type: 'SET_GITHUB_OPTION_OWNER', owner: e.target.value })
          }
        />
      </Section>
      <Section>
        <Label>Github Repository Name</Label>
        <Textbox
          value={githubOptions.repo}
          onChange={(e) =>
            dispatch({ type: 'SET_GITHUB_OPTION_REPO', repo: e.target.value })
          }
        />
      </Section>
      <Section>
        <Label>Personal Access Token (from Github)</Label>
        <Textbox
          value={githubOptions.personalAccessToken}
          onChange={(e) =>
            dispatch({
              type: 'SET_GITHUB_OPTION_TOKEN',
              personalAccessToken: e.target.value,
            })
          }
        />
      </Section>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Section = styled.div`
  padding-top: 10px;
`;

const Label = styled.div`
  padding-right: 10px;
`;

const Textbox = styled.input`
  font-size: 14px;
  width: 300px;
  padding: 12px 15px;
  border-width: 1px;
  border-color: lightgrey;
  color: black;
  background-color: white;
  border-radius: 5px;
`;

export default GithubIntegrationOptions;
