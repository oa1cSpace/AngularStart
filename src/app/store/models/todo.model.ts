export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
  editing: boolean;
  user_id?: number;
  createdAt?: string;
  description?: string;
  updatedAt? : string
}
