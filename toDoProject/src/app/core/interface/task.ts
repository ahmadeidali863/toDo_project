export interface Task {
  title: string;
  description: string;
  subtasks: string[];
  progressBar: number;
  status: TaskStatus;
  columnId: string;
  }
  
export enum TaskStatus {
  Todo = 'To-do',
  Doing = 'Doing',
  Done = 'Done',
}