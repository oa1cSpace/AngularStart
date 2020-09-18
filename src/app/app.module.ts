import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';

import {Routes, RouterModule} from "@angular/router";

import {AppComponent} from './app.component';
import {RegistrationFormComponent} from "./pages/registration-form/registration-form.component";
import {LoginFormComponent} from "./pages/login/login-form.component";
import {TodoListComponent} from "./pages/todo-list/todo-list.component";
import {EditProfileComponent} from "./pages/profile/edit-profile.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {CustomRouterStateSerializer} from "./store/router";
import * as fromStore from '../app/store/index';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {AuthGuard} from "./services/auth.guard";
import {ApiService} from "./services/api.service";
import {ApiInterceptor} from "./services/api.interceptor";
import {localStorageSync} from "ngrx-store-localstorage";
import {storeFreeze} from "ngrx-store-freeze";

// list of routes:
const appRoutes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'registration', component: RegistrationFormComponent},

  {path: 'todo-list',
    component: TodoListComponent,
    canActivate: [AuthGuard]
  },
  {path: 'profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard]},
]
//
// export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
//   return localStorageSync({keys: ['todos', 'users']})(reducer);
// }
// const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: Object.keys(fromStore.reducers), rehydrate: true})(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = environment.production
  ? [localStorageSyncReducer]
  : [localStorageSyncReducer, storeFreeze];

@NgModule({

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    MatCardModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    StoreModule.forRoot(fromStore.reducers, {metaReducers}),
    !environment.production
      ? StoreDevtoolsModule.instrument({maxAge: 50})
      : [],
    EffectsModule.forRoot(fromStore.effects),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router' // name of reducer key
    }),
    HttpClientModule,
    MatCheckboxModule,

  ],

  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    TodoListComponent,
    EditProfileComponent,
  ],

  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    },
    AuthGuard,  // guard here
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
