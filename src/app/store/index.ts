import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { RouterStateUrl } from './router';
import {routerReducer, RouterReducerState} from '@ngrx/router-store';
import * as users from './reducers/user.reducer';
import * as todos from './reducers/todo.reducer';
import {RouterEffects} from "./effects/router.effects";


export interface State {
  users: users.State;
  todos: todos.State;
  router: RouterReducerState<RouterStateUrl>,
}

export const reducers: ActionReducerMap<State> = {
  users: users.reducer,
   todos: todos.reducer,
  router: routerReducer,
};

export const selectAdminState = createFeatureSelector<State>('admin');
export const selectUsersState = createSelector(
  selectAdminState,
  (state: State) => state.users
);


export const effects = [RouterEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storeFreeze]
  : [];
