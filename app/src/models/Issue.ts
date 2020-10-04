interface Issue {
  title: string;
  body: string;
  assignees: string[];
  components: string[];
  labels: string[];
  weight: number;
  priority: string[];
}

// object to contain and save imported predefined lists of values that elements of the issue can assume
export interface IssueElementsList {
  labels: string[];
  assignees: string[];
  components: string[];
  priorities: string[];
}

export default Issue;
