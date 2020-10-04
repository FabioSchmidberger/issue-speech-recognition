import { useDispatch } from 'react-redux';
import { useIntegration } from './integrationAdapter';

export function useIssueElementsImporter() {
  const dispatch = useDispatch();
  const integration = useIntegration();

  console.log(integration.name);

  integration
    .getLabels()
    .then((labels) => dispatch({ type: 'SET_LABELS', labels: labels }));

  integration
    .getAssignees()
    .then((assignees) =>
      dispatch({ type: 'SET_ASSIGNEES', assignees: assignees }),
    );

  integration
    .getComponents()
    .then((components) =>
      dispatch({ type: 'SET_COMPONENTS', components: components }),
    );
  integration
    .getPriorities()
    .then((priorities) =>
      dispatch({ type: 'SET_PRIORITIES', priorities: priorities }),
    );
}
