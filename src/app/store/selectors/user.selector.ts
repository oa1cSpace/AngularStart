import {createFeatureSelector, createSelector} from "@ngrx/store";

export const getUserStore = createFeatureSelector('users');

export const getUserSelector = createSelector(
  getUserStore,
  (state: any) => state.user
);
