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


import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../store/models/todo.model';



import {HttpClient} from '@angular/common/http';
import {AddTodo, AddAllTodos} from '../store/actions/todo.actions';
import {getTodoSelector} from '../store/selectors/todo.selector';
import { filter } from 'rxjs/operators';
import { Subscription} from "rxjs";
import {environment} from "../../environments/environment";
import {select, Store} from "@ngrx/store";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
   // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit, OnDestroy {

  public todos: Todo[];

  public todoList$ = this.store.pipe(select(getTodoSelector), filter(Boolean));
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  value = 'Clear';

  public subscribes: Array<Subscription> = []

  constructor(private store: Store, private http: HttpClient) {

  }

  ngOnInit(): void {

    this.getAllTasks();


    this.filter = 'all';
    this.beforeEditCache = '';
    this.todoTitle = '';

    this.subscribes.push(

      // this.http.get(environment.api).subscribe((todoList: Todo[]) => {
        // this.store.dispatch(new SetTodo(todoList));
      // }),

      this.todoList$.subscribe((todoList: Array<Todo>) => {
        this.todos = todoList;
        this.todosFiltered();
      }),

    );
  }

  public getAllTasks(): void {
    this.http.get(
      'http://localhost:3000/tasks',
    ).subscribe((todos: Todo[]) => {
      this.store.dispatch(new AddAllTodos(todos));
    });
  }

  public addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    const newTodo: Todo = {
      id: this.idForTodo,
      title: this.todoTitle,
      completed: false,
      editing: false
    };

    this.http.post(
      'http://localhost:3000/task',
      newTodo,
      ).subscribe((todo: Todo) => {
      this.store.dispatch(new AddTodo(todo));
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
    this.http.post(`http://localhost:3000/task/${id}`, allTodo).subscribe((todos) => {
      console.log(todos);
    });
  }

  public todosFiltered(): Todo[] {
    console.log('asasa', this.todos);
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }

  ngOnDestroy(): void {
    this.subscribes.forEach( s => s.unsubscribe());
  }

}


