import Issue from '../models/Issue';

abstract class AbstractIntegrationAdapter {
  public abstract name: String;
  public abstract createIssue(issue: Issue): Promise<void>;
  public abstract getLabels(): Promise<void | string[]>;
  public abstract getAssignees(): Promise<void | string[]>;
  public abstract getComponents(): Promise<void | string[]>;
  public abstract getPriorities(): Promise<void | string[]>;
}

export default AbstractIntegrationAdapter;
