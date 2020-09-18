export interface Todo {
  id?: number;
  user_id?: number;
  title: string;
  description?: string;
  editing?: boolean;
  editingOnUI?: boolean;
  completed?: boolean | null;
  createdAt?: string;
  updatedAt? : string
}
