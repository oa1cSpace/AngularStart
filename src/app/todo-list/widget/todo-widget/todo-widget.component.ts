import { Component, OnInit } from '@angular/core';
import {TodoState} from '../../store/todo/todo.reducer';
import {Store} from '@ngrx/store';
import {TodoCreateAction} from '../../store/todo/todo.actions';
import {select} from '@ngrx/core';
import {todoListSelector} from '../../store/todo/todo.selectors';
import {Todo} from '../../store/todo/model/todo';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-todo-widget',
  templateUrl: './todo-widget.component.html',
  styleUrls: ['./todo-widget.component.css']
})
export class TodoWidgetComponent implements OnInit {

  // @ts-ignore
  todoList$: Observable<Todo[]> = this.store$.pipe(select(todoListSelector));

  constructor(private store$: Store<TodoState>) { }

  ngOnInit(): void { }

  onCreate(name: string){
    this.store$.dispatch(new TodoCreateAction({name}));
  }
}
