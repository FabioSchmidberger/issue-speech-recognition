import { Octokit } from '@octokit/rest';
import Issue from '../models/Issue';
import { GithubOptions } from '../state/settingsReducer';
import AbstractIntegrationAdapter from './AbstractIntegrationAdapter';

class GithubAdapter extends AbstractIntegrationAdapter {
  public name = 'GITHUB';
  private octokit: Octokit;
  private owner: string;
  private repo: string;

  constructor(githubOptions: GithubOptions) {
    super();
    this.owner = githubOptions.owner;
    this.repo = githubOptions.repo;
    this.octokit = new Octokit({
      auth: githubOptions.personalAccessToken,
    });
  }

  public async createIssue(issue: Issue) {
    await this.octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: this.owner,
      repo: this.repo,
      title: issue.title,
      body: this.buildIsuseBody(issue),
      labels: issue.labels,
      assignees: issue.assignees,
    });
  }

  public async getLabels() {
    return this.octokit.issues
      .listLabelsForRepo({
        owner: this.owner,
        repo: this.repo,
      })
      .then((response) => response.data.map((label) => label.name))
      .catch((e) => console.log(e));
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

  public async getAssignees() {
    return this.octokit.issues
      .listAssignees({
        owner: this.owner,
        repo: this.repo,
      })
      .then((response) => response.data.map((user) => user.login))
      .catch((e) => console.log(e));
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

export default GithubAdapter;
