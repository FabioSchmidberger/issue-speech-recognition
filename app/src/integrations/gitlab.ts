import Axios from 'axios';

function createGitlabIssue() {
  const PRIVATE_TOKEN = '';
  const PROJECT_ID = '';

  const baseURL = 'https://gitlab.example.com/api/v4';
  const api = Axios.create({ baseURL });

  //curl --request POST --header "PRIVATE-TOKEN: <your_access_token>" "https://gitlab.example.com/api/v4/projects/4/issues?title=Issues%20with%20auth&labels=bug"
}
