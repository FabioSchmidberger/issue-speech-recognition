import { combineReducers, AnyAction } from 'redux';
import settings, { State as SettingsState } from './settingsReducer';
import issueElements, {
  State as IssueElementsState,
} from './IssueElementsReducer';

export interface RootState {
  settings: SettingsState;
  issueElements: IssueElementsState;
}

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
