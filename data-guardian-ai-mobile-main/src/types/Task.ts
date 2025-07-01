
export interface Task {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  progress: number;
  assignee: string;
  deadline: string;
  autoProcessable: boolean;
  aiResult?: any;
  confirmationData?: any;
}

export interface Category {
  key: string;
  label: string;
  count: number;
}
