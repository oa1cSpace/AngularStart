import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {RegistrationFormComponent} from './registration-form/registration-form.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {TodoListComponent} from './todo-list/page/todo-list.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {TodoModule} from './todo-list/todo.module';

// list of routes:
const appRoutes: Routes = [
  {path: '', component: RegistrationFormComponent},
  {path: 'login', component: LoginFormComponent},
 /* {path: 'todo-list', component: TodoListComponent},*/
  {path: 'edit-profile', component: EditProfileComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    TodoListComponent,
    EditProfileComponent,
  ],
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
    MatCardModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    /*RouterModule.forRoot(appRoutes),*/
    RouterModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    TodoModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
