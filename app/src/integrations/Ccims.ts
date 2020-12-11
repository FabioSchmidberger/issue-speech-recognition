import Issue from '../models/Issue';
import { request } from 'graphql-request';
import { CcimsOptions } from '../state/settingsReducer';
import AbstractIntegrationAdapter from './AbstractIntegrationAdapter';

class CcimsAdapter extends AbstractIntegrationAdapter {
  public name = 'CCIMS';

  private api: string;
  private projectId: string;

  constructor() {
    super();
    this.api = 'http://localhost:8080/api';
    this.projectId = '1';
  }

  public async createIssue(issue: Issue) {
    const ccimsIssue = {
      title: issue.title,
      body: issue.body,
      componentIDs: [0],
    };

    const inputData = { input: ccimsIssue };
    const queryIssue = `
        mutation createIssue($input: CreateIssueInput!) {
          createIssue(input: $input) {
            issue {
              id
            }
          }
        }
      `;
    try {
      const data = await request(`${this.api}`, queryIssue, inputData);
      const issueID = data.createIssue.issue.id;
      console.log('CREATED ISSUE', issueID);
      return issueID;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getLabels(): Promise<string[]> {
    /*
    export const GetLabelsDocument = gql`
    query GetLabels($projectId: ID!) {
  node(id: $projectId) {
    ... on Project {
      labels {
        nodes {
          id
          name
          color
        }
      }
    }
  }
}
  */
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
