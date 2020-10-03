interface Issue {
  title: string;
  body: string;
  assignees: string[];
  components: string[];
  labels: string[];
  weight: number;
  priority: IssuePriority;
}

export enum IssuePriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export default Issue;
