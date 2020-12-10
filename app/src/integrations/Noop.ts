import Issue from '../models/Issue';
import AbstractIntegrationAdapter from './AbstractIntegrationAdapter';

class NoopAdapter extends AbstractIntegrationAdapter {
  public name = 'NOOP';

  constructor() {
    super();
  }

  public async createIssue(issue: Issue) {}

  public async getLabels(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      return resolve([
        'bug',
        'userstory',
        'feature',
        'question',
        'enhancement',
        'good first issue',
      ]);
    });
  }

  public async getAssignees(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      return resolve([
        'Fabio Schmidberger',
        'Erik Master',
        'Max Muster',
        'Sandro Speth',
        'Jake Coder',
      ]);
    });
  }

  public async getComponents(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      return resolve([
        'Payment-Service',
        'Auth-Service',
        'Logging-Service',
        'Frontend-Service',
      ]);
    });
  }

  public async getPriorities(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      return resolve(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
    });
  }
}

export default NoopAdapter;
