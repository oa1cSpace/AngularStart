import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';

import {Routes, RouterModule} from "@angular/router";

import { AppComponent } from './app.component';
import {RegistrationFormComponent} from "./registration-form/registration-form.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {HttpClientModule} from "@angular/common/http";
import {CustomRouterStateSerializer} from "./store/router";
import * as fromStore from '../app/store/index';
import {MatCheckboxModule} from "@angular/material/checkbox";

// list of routes:
const appRoutes: Routes = [
  {path: '', component: LoginFormComponent},
  {path: 'registration', component: RegistrationFormComponent},
  {path: 'todo-list', component: TodoListComponent},
  {path: 'edit-profile', component: EditProfileComponent},
]

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
    /*StoreModule.forRoot(reducers, {metaReducers}),*/
    StoreModule.forRoot(fromStore.reducers, {metaReducers: []}),
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
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
