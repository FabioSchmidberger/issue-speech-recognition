import { Octokit } from '@octokit/rest';
import Issue from '../models/Issue';
import AbstractIntegrationAdapter from './AbstractIntegrationAdapter';

const PERSONAL_ACCESS_TOKEN = '3ab1627652c24972dc7ca525885fa9943af7733f';
const OWNER = 'FabioSchmidberger';
const REPO = 'se_172_enterprise_software_assignments';

class GithubAdapter extends AbstractIntegrationAdapter {
  private octokit = new Octokit({
    auth: PERSONAL_ACCESS_TOKEN,
  });

  public async createIssue(issue: Issue) {
    await this.octokit.request('POST /repos/{owner}/{repo}/issues', {
      owner: OWNER,
      repo: REPO,
      title: issue.title,
      body: this.buildIsuseBody(issue),
      labels: issue.labels,
      assignees: issue.assignees,
    });
  }

  public async getLabels() {
    return this.octokit.issues
      .listLabelsForRepo({
        owner: OWNER,
        repo: REPO,
      })
      .then((response) => response.data.map((label) => label.name));
  }

  public async getAssignees() {
    return this.octokit.issues
      .listAssignees({
        owner: OWNER,
        repo: REPO,
      })
      .then((response) => response.data.map((user) => user.login));
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
