import { useMemo } from 'react';
import GithubAdapter from './github';

export const Adapters = {
  github: GithubAdapter,
};

export function useIntegration() {
  return useMemo(() => new Adapters.github(), []);
}
