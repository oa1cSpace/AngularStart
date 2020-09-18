import {Component, OnDestroy, OnInit} from '@angular/core';
import {Todo} from '../../store/models/todo.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddTodo, AddAllTodos, DeleteToDo, EditTodo, EditOnTodo, DoneTodo} from '../../store/actions/todo.actions';
import {getTodoSelector} from '../../store/selectors/todo.selector';
import {filter} from 'rxjs/operators';
import {Subscription} from "rxjs";
import {select, Store} from "@ngrx/store";
import {ApiService} from "../../services/api.service";
import {throwMatDialogContentAlreadyAttachedError} from "@angular/material/dialog";
import {UserLogOut} from "../../store/actions/user.actions";
import {Router} from "@angular/router";


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  public todos: Todo[];
  public todoList$ = this.store.pipe(select(getTodoSelector), filter(Boolean));
  todoTitle: string;
  idForTodo: number;
  beforeEditCache: string;
  filter: string;
  value = 'Clear';

  public subscribes: Array<Subscription> = [];

  constructor(
    private store: Store,
    private http: HttpClient,
    private apiService: ApiService,
    public router: Router,
  ) {

  };

  ngOnInit(): void {
    this.getAllTasks();

    this.filter = 'all';
    this.beforeEditCache = '';
    this.todoTitle = '';
    this.subscribes.push(
      this.todoList$.subscribe((todoList: Array<Todo>) => {
        this.todos = todoList;
        this.todosFiltered();
      }),
    );
  };

  /* ===== GET_ALL_TASKS ===== */
  public getAllTasks(): void {
    console.log("===============[ TOKEN ]================>", localStorage.getItem('token'));

    this.apiService.getTodos().subscribe( (todos: Todo[]) => {
      this.store.dispatch(new AddAllTodos(todos));
    });

  };

  /* ===== ADD_TODO ===== */
  public addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    const newTodo: Todo = {
      id: this.idForTodo,
      title: this.todoTitle,
    };

    this.http.post(
      'http://localhost:3000/task',
      newTodo,
    ).subscribe((todo: Todo) => {
      this.store.dispatch(new AddTodo(todo));
    });

    this.todoTitle = '';
  };

  /* ===== DONE_TODO ===== */
  public todoIsDone(todo: Todo): void {
    let isCompleted = false;
    this.todos = this.todos.map(
      (el) => {
        if (el.id === todo.id) {
          isCompleted = !el.completed;
          return {...el, completed: !el.completed};
        }
        return el;
      });

    this.http.post(`http://localhost:3000/task/${todo.id}/complete`,
      {id: todo.id, completed: isCompleted}).subscribe((res: any) => {
      if (res.status) {
        this.store.dispatch(new DoneTodo({id: todo.id, title: todo.title}));
      }
    });
  };

  /* ===== EDIT_TODO ===== */
  public editTodo(todo: Todo): void {

    // console.warn('@@ {editTodo}  ===========>');

    this.beforeEditCache = todo.title;

    // console.warn('@@ todo.title ======> ', todo.title);
    this.store.dispatch(new EditOnTodo({id: todo.id, title: todo.title}));

    this.todos = this.todos.map(
      el => {
        if (el.id === todo.id) {
          return {...el, editingOnUI: true};     // IMMUTABILITY   !!!!!!!!!
        }
        return el;
      });
  };

  /* ===== DONE_EDIT_TODO ===== */
  public doneEdit(todo: Todo): void {
    if (todo.title.trim().length === 0) {
      //get from DB and edit + push data to todo
      todo.title = this.beforeEditCache;
    }
    this.todos = this.todos.map(
      el => {
        if (el.id === todo.id) {
          return {...el, editingOnUI: false};
        }
        return el;
      });


    this.http.post(
      `http://localhost:3000/task/${todo.id}/edit`,
      {id: todo.id, title: todo.title}
      , {headers: {authorization: localStorage.getItem('token')}}
    )
      .subscribe((res: any) => {
        if (res.status) {
          this.store.dispatch(new EditTodo({id: todo.id, title: todo.title}));
        }
      });
  };

  /* ===== CANCEL_EDIT_TODO ===== */
  public cancelEdit(todo: Todo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  };

  /* ===== DELETE_TODO ===== */
  public deleteTodo(id: number): void {
    const allTodo = {};
    this.http.post(`http://localhost:3000/task/${id}`, allTodo).subscribe((res: any) => {
      this.store.dispatch(new DeleteToDo(parseInt(res.taskId)));
    });
  };

  /* ===== FILTER_TODO ===== */
  public todosFiltered(): Todo[] {
    /*console.log('asasa', this.todos);*/
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  };

  // UNSUBSCRIBE METHOD
  ngOnDestroy(): void {
    this.subscribes.forEach((s) => s.unsubscribe());
  };

  logOut() {
    this.store.dispatch(new UserLogOut());
    localStorage.clear();
    this.router.navigate(['/']);

  }
}

