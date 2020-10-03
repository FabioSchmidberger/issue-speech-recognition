import { AnyAction as ReduxAnyAction } from 'redux';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';

export interface State {
  token: string | null;
}

export const initialState = {
  token: null,
};

function settingsReducer(
  state: State = initialState,
  reduxAction: ReduxAnyAction,
) {
  switch (reduxAction.type) {
    case 'LOGIN':
      return {
        ...state,
        token: reduxAction.token,
      };
    default:
      return state;
  }
}

export function useSettings() {
  return useSelector((state: RootState) => state.settings);
}

export default settingsReducer;
