import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Todo} from '../models/todo.model';
import {TodoActions, TodoActionTypes} from '../actions/todo.actions';
import {element} from "protractor";
import {UserActions, UserActionTypes} from "../actions/user.actions";

export interface State extends EntityState<Todo> {
  todo: Todo[];
  loaded: boolean;
  loading: boolean;
  error: any;
  selectedTodoId: number;


}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = adapter.getInitialState({
  todo: [],
  loaded: false,
  loading: false,
  selectedTodoId: null,
  error: null,
});

export function reducer(state = initialState, action: TodoActions | UserActions): State {

  switch (action.type) {
    case TodoActionTypes.todoGetTodo:
    case TodoActionTypes.todoGetTodoById:
      return {
        ...state,
        loading: true
      };

    case TodoActionTypes.todoAddTodo:
      // case TodoActionTypes.todoUpdateTodo:
      return {
        ...state,
        todo: [...state.todo, action.payload],
        loading: true
      };

    case TodoActionTypes.todoAddAllTodos:
      // case TodoActionTypes.todoUpdateTodo:
      /*console.log('222222222 ', action)*/
      return {
        ...state,
        todo: [...state.todo, ...action.payload],
        loading: true
      };
    case UserActionTypes.userLogOut:
      // case TodoActionTypes.todoUpdateTodo:
      /*console.log('222222222 ', action)*/
      return {
        ...state,
        todo: [],
        loading: false
      };

    case TodoActionTypes.todoGetTodoSuccess:
      return adapter.setAll([action.payload], {
        ...state,
        loading: false,
        loaded: true
      });

    case TodoActionTypes.todoGetTodoByIdSuccess:
      return {...state, selectedTodoId: action.payload.id, loading: false};

    case TodoActionTypes.todoAddTodoSuccess:
      return adapter.addOne(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case TodoActionTypes.todoUpdateTodoSuccess: {
      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload
        },
        {
          ...state,
          loading: false,
          loaded: true
        }
      );
    }

    case TodoActionTypes.todoError:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };

    case TodoActionTypes.todoDelete: {
      return {
        ...state,
        todo: [
          ...state.todo.filter((element) => element.id !== action.payload)
        ]
      };
    }

    case TodoActionTypes.todoEdit: {
      return {
        ...state,
        todo: [
          ...state.todo.map((element) => {
            if(element.id === action.payload.id) {
              return {
                ...element,
                title: action.payload.title,
                editing: true,
              };
            }

            return element;
          }),
        ]
      };
    }







    default:
      return state;
  }
}

export const todoEntitySelectors = adapter.getSelectors();
