import { useDispatch } from 'react-redux';
import { useIntegration } from './integrationAdapter';

export function useIssueElementsImporter() {
  const dispatch = useDispatch();
  const integration = useIntegration();

  integration
    .getLabels()
    .then((labels) => dispatch({ type: 'SET_LABELS', labels: labels }));

  integration
    .getAssignees()
    .then((assignees) =>
      dispatch({ type: 'SET_ASSIGNEES', assignees: assignees }),
    );
}
