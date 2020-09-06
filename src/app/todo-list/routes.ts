import {Route} from '@angular/router';
import {TodoListComponent} from './page/todo-list.component';

export const todoRoutes: Route [] = [
  {
    path: 'todo-list',
    component: TodoListComponent
  }
];
