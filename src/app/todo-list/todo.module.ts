import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {TODO_REDUCER_NODE, todoReducer} from './store/todo/todo.reducer';
import {RouterModule} from '@angular/router';
import {todoRoutes} from './routes';
import { TodoWidgetComponent } from './widget/todo-widget/todo-widget.component';
import { TodoCreateFormUiComponent } from './ui/todo-create-form-ui/todo-create-form-ui.component';
import {FormsModule} from '@angular/forms';
import { TodoListUiComponent } from './ui/todo-list-ui/todo-list-ui.component';
import {TodoListComponent} from "./page/todo-list.component";



@NgModule({
  declarations: [TodoWidgetComponent, TodoCreateFormUiComponent, TodoListUiComponent],
  exports: [
    TodoWidgetComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(TODO_REDUCER_NODE, todoReducer),
    RouterModule.forChild([
      {
        path: 'todo-list',
        component: TodoListComponent
      }
    ]),
    FormsModule
  ]
})
export class TodoModule { }

