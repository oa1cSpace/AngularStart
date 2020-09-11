import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../store/models/user.model";
import {AddUser} from '../store/actions/user.actions';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
// @ts-ignore
import * as fromReducer from '../store/reducers';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  public hide = true;

  public user: User;

  public reactiveForm: FormGroup = this.fb.group({

    name: this.fb.control('',[
      Validators.required,
     // Validators.pattern(/^[A-Za-zА-Яа-яЁё]{2,30}/)
    ]),

    surname: this.fb.control('',[
      Validators.required
    ]),

    email: this.fb.control('', [
      Validators.required,
      Validators.email,
      // Validators.pattern(/[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/)
    ]),

    password: this.fb.control('', [
      Validators.required,
      // Validators.pattern(/[A-Za-zА-Яа-яЁё]{4,60}/)
    ]),
  });

  public getErrorMessage = {email: ''};

  constructor(private fb: FormBuilder,
              private store: Store<fromReducer.users.State>,
              private http: HttpClient
  ){}

  // tslint:disable-next-line:typedef
  ngOnInit(): void{
    this.initForm();
  }
  // tslint:disable-next-line:typedef
  initForm(){
    this.reactiveForm = this.fb.group({
      name: [null],
      surname: [null],
      email: [null],
      password: [null]
    });
  }

  public addUser(): void {
    // this.store.dispatch(new AddUser(this.form.getRawValue()));
    this.http.post('http://localhost:3000/users', this.reactiveForm.getRawValue()).subscribe((value: User) => {
      /*console.log('VALUE', value);*/
      window.localStorage.setItem('user', JSON.stringify(value));
      this.store.dispatch(new AddUser(value));
    });
  }
}
