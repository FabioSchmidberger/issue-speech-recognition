import { combineReducers, AnyAction } from 'redux';
import settings, {
  State as SettingsState,
  initialState as settingsInitialState,
} from './settingsReducer';
import issueElements, {
  State as IssueElementsState,
  initialState as issueElementsInitialState,
} from './IssueElementsReducer';

export interface RootState {
  settings: SettingsState;
  issueElements: IssueElementsState;
}

export const storeInitialState = {
  settings: settingsInitialState,
  issueElements: issueElementsInitialState,
};

const combinedReducer = combineReducers<RootState>({
  settings,
  issueElements,
});

const rootReducer = (state: RootState | undefined, action: AnyAction) => {
  let newState = state;

  if (action.type === 'PURGE') {
    newState = undefined;
  }

  return combinedReducer(newState, action);
};

export default rootReducer;
