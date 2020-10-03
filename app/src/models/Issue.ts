interface Issue {
  title: string;
  body: string;
  assignees: string[];
  components: string[];
  labels: string[];
  weight: number;
  priority: IssuePriority;
}

// object to contain and save imported predefined lists of values that elements of the issue can assume
export interface IssueElementsList {
  labels: string[];
  assignees: string[];
  components: string[];
}

export enum IssuePriority {
  NONE = '',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export default Issue;
