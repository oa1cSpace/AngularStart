import {Action} from "@ngrx/store";

export enum todoActionsType{
  create = '[TODO] Create todo item',
}

export class TodoCreateAction implements Action {
  readonly type = todoActionsType.create;
  constructor(public  payload: {name: string}) {
  }
}


export type TodoActions = TodoCreateAction;
