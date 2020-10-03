import { useMemo } from 'react';
import { useSettings } from '../state/settingsReducer';
import GithubAdapter from './github';

export const Adapters = {
  github: GithubAdapter,
};

export function useIntegration() {
  const { githubOptions } = useSettings();
  return useMemo(() => {
    return new Adapters.github(githubOptions);
  }, []);
}
