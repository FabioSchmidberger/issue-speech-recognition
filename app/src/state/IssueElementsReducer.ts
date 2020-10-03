import { AnyAction as ReduxAnyAction } from 'redux';
import { useSelector } from 'react-redux';
import { RootState } from './rootReducer';
import { IssueElementsList } from './../models/Issue';

export interface State {
  elements: IssueElementsList;
}

export const initialState = {
  elements: {
    labels: [],
    assignees: [],
    components: [],
  },
};

function IssueElementsReducer(
  state: State = initialState,
  reduxAction: ReduxAnyAction,
) {
  switch (reduxAction.type) {
    case 'SET_LABELS':
      return {
        ...state,
        elements: {
          ...state.elements,
          labels: reduxAction.labels,
        },
      };
    case 'SET_ASSIGNEES':
      return {
        ...state,
        elements: {
          ...state.elements,
          assignees: reduxAction.assignees,
        },
      };
    case 'SET_COMPONENTS':
      return {
        ...state,
        elements: {
          ...state.elements,
          components: reduxAction.components,
        },
      };
    default:
      return state;
  }
}

export function useIssueElementLists() {
  return useSelector((state: RootState) => state.issueElements.elements);
}

export default IssueElementsReducer;
