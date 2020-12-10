import { useMemo } from 'react';
import { IssueIntegration, useSettings } from '../state/settingsReducer';
import GithubAdapter from './Github';
import CcimsAdapter from './Ccims';
import NoopAdapter from './Noop';

export const Adapters = {
  github: GithubAdapter,
  ccims: CcimsAdapter,
  noop: NoopAdapter,
};

export function useIntegration() {
  const { githubOptions, issueIntegration } = useSettings();

  return useMemo(() => {
    if (issueIntegration === IssueIntegration.GITHUB)
      return new Adapters.github(githubOptions);

    if (issueIntegration === IssueIntegration.CCIMS)
      return new Adapters.ccims();

    if (issueIntegration === IssueIntegration.NOOP) return new Adapters.noop();

    return new Adapters.noop();
  }, [issueIntegration, githubOptions]);
}
