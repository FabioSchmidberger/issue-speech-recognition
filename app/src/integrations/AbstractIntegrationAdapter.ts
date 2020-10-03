import Issue from '../models/Issue';

abstract class AbstractIntegrationAdapter {
  public abstract createIssue(issue: Issue): Promise<void>;
}

export default AbstractIntegrationAdapter;
