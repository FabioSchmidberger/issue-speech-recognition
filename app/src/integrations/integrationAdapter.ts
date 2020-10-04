import { useMemo } from 'react';
import { IssueIntegration, useSettings } from '../state/settingsReducer';
import GithubAdapter from './Github';
import CcimsAdapter from './Ccims';

export const Adapters = {
  github: GithubAdapter,
  ccims: CcimsAdapter,
};

export function useIntegration() {
  const { githubOptions, issueIntegration } = useSettings();

  return useMemo(() => {
    if (issueIntegration === IssueIntegration.GITHUB)
      return new Adapters.github(githubOptions);

    if (issueIntegration === IssueIntegration.CCIMS)
      return new Adapters.ccims();

    return new Adapters.ccims();
  }, [issueIntegration, githubOptions]);
}
