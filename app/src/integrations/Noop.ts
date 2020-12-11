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
        'documentation',
        'user story',
        'feature',
        'question',
        'enhancement',
        'design',
      ]);
    });
  }

  public async getAssignees(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      return resolve([
        'Fabio Schmidberger',
        'Erik Master',
        'Max Muster',
        'Marcel Architect',
        'Stephen Musk',
        'Maria Schnell',
        'Jake Coder',
      ]);
    });
  }

  public async getComponents(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      return resolve([
        'Payment-Service',
        'Frontend',
        'API',
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
