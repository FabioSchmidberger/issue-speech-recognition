import { AnyAction as ReduxAnyAction } from 'redux';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';

export interface State {
  speechEngine: SpeechEngine;
  issueIntegration: IssueIntegration;
  githubOptions: GithubOptions;
}

export enum SpeechEngine {
  GOOGLE = 'GOOGLE',
  DEEPSPEECH = 'DEEPSPEECH',
}

export enum IssueIntegration {
  GITHUB = 'GITHUB',
  CCIMS = 'CCIMS',
}

export const initialState: State = {
  speechEngine: SpeechEngine.GOOGLE,
  issueIntegration: IssueIntegration.CCIMS,
  githubOptions: {
    repo: '',
    owner: '',
    personalAccessToken: '',
  },
};

export interface GithubOptions {
  repo: string;
  owner: string;
  personalAccessToken: string;
}

function settingsReducer(
  state: State = initialState,
  reduxAction: ReduxAnyAction,
) {
  switch (reduxAction.type) {
    case 'SET_SPEECHENGINE':
      return {
        ...state,
        speechEngine: reduxAction.speechEngine,
      };
    case 'SET_ISSUEINTEGRATION':
      return {
        ...state,
        issueIntegration: reduxAction.issueIntegration,
      };
    case 'SET_GITHUB_OPTION_REPO':
      return {
        ...state,
        githubOptions: {
          ...state.githubOptions,
          repo: reduxAction.repo,
        },
      };
    case 'SET_GITHUB_OPTION_OWNER':
      return {
        ...state,
        githubOptions: {
          ...state.githubOptions,
          owner: reduxAction.owner,
        },
      };
    case 'SET_GITHUB_OPTION_TOKEN':
      return {
        ...state,
        githubOptions: {
          ...state.githubOptions,
          personalAccessToken: reduxAction.personalAccessToken,
        },
      };
    default:
      return state;
  }
}

export function useSettings() {
  return useSelector((state: RootState) => state.settings);
}

export default settingsReducer;
