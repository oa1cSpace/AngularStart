/*
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit{

  public todos: Todo[];

  newTodo: string;
  todos: any;
  todoObj: any;

  constructor() {
    this.newTodo = '';
    this.todos = [];
  }

  addTodo(event) {
    this.todoObj = {
      newTodo: this.newTodo,
      completed: false
    }
    this.todos.push(this.todoObj);
    this.newTodo = '';
    event.preventDefault();
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
  }

  deleteSelectedTodos() {
    for (let i = (this.todos.length - 1); i > -1; i--) {
      if (this.todos[i].completed) {
        this.todos.splice(i, 1);
      }
    }
  }
}
*/


import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Todo} from '../store/models/todo.model';
import {select,Store} from '@ngrx/store';
import {getTodoSelector} from '../store/selectors/todo.selector';
// @ts-ignore
import * as fromReducer from '../store/reducers';
import {HttpClient} from '@angular/common/http';
import {User} from '../store/models/user.model';
import {AddUser} from '../store/actions/user.actions';
import {AddTodo,GetTodo} from '../store/actions/todo.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {

  public todos: Todo[];

  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  value = 'Clear';

  constructor(private store: Store<fromReducer.todos.State>, private http: HttpClient) {
  }

  public addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    const newTodo = {
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    };

    // @ts-ignore
    this.todos.push(newTodo);

    this.http.post('http://localhost:3000/todo-list', newTodo).subscribe((todo: Todo) => {
      // console.log('todo.id', todo.id);
      // window.localStorage.setItem('todo', JSON.stringify(todo));
      this.store.dispatch(new AddTodo(todo));
      // console.log("this.todos", new AddTodo(todo));
    });

    this.todoTitle = '';
  }


  public editTodo(todo: Todo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  public doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      //get from DB and edit + push data to todo
      todo.title = this.beforeEditCache;
    }
    todo.editing = false;
  }

  public cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  public deleteTodo(id: number): void {

    const allTodo = {};

    this.http.get('http://localhost:3000/todo-list', allTodo).subscribe((todos) => {

      console.log(todos);

    });
  }

  public todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }

  ngOnInit(): void {

    // get data from DB

    this.filter = 'all';
    this.beforeEditCache = '';
    this.todoTitle = '';
    this.todos = [
      {
        title: 'Click me, i\'m rewritable',
        completed: false,
        editing: false,
      },
    ];
  }
}
