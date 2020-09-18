import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../store/models/user.model";
import {AddUser} from '../../store/actions/user.actions';
import {HttpClient} from "@angular/common/http";
import {Store} from "@ngrx/store";
// @ts-ignore
import * as fromReducer from '../../store/reducers';
import {Observable} from "rxjs";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {



  public hide = true;

  /*public user: User;*/

  public reactiveForm: FormGroup = this.fb.group({

    name: this.fb.control('',[
      Validators.required,
    ]),

    surname: this.fb.control('',[
      Validators.required
    ]),

    email: this.fb.control('', [
      Validators.required,
      Validators.email,
    ]),

    password: this.fb.control('', [
      Validators.required,
    ]),
  });

  public getErrorMessage = {email: ''};

  constructor(private fb: FormBuilder,
              private store: Store<fromReducer.users.State>,
              private http: HttpClient,
              private router: Router
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
    this.http.post(
      'http://localhost:3000/users',
      this.reactiveForm.getRawValue()
      ).subscribe((res: any) => {
      localStorage.setItem(
        'token', res.token
      );
      this.store.dispatch(new AddUser(this.reactiveForm.getRawValue()));

      this.router.navigate(['/todo-list']);



    }
    );
  }
}
