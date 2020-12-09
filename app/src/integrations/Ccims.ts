import Issue from '../models/Issue';
import AbstractIntegrationAdapter from './AbstractIntegrationAdapter';

class CcimsAdapter extends AbstractIntegrationAdapter {
  public name = 'CCIMS';

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
        'Loggin-Service',
        'Frontend-Service',
      ]);
    });
  }

  public async getPriorities(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      return resolve(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
    });
  }

  private buildIsuseBody(issue: Issue) {
    let issueBody =
      issue.body +
      '\n \n' +
      '## Components' +
      '\n' +
      issue.components +
      '\n \n' +
      '## Priority: ' +
      issue.priority +
      '\n \n' +
      '## Weight: ' +
      issue.weight;

    return issueBody;
  }
}

export default CcimsAdapter;
