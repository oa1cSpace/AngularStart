import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../store/models/user.model";
import {Todo} from "../../store/models/todo.model";
import {AddAllTodos, AddTodo} from "../../store/actions/todo.actions";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {AddUser} from "../../store/actions/user.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  hide = true;
  reactiveForm: FormGroup = this.fb.group({

    name: this.fb.control('', [
      Validators.required,
    ]),

    password: this.fb.control('', [
      Validators.required,
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private  http: HttpClient,
    private router: Router,
    private store: Store,
  ) {
  }


  ngOnInit() {
    // this.initForm();
  }

  // initForm() {
  //   this.reactiveForm = this.fb.group({
  //     name: [null],
  //     password: [null]
  //   });
  // }


  public login(): void {
    console.log('======[ this.reactiveForm.getRawValue() ]=========>', this.reactiveForm.getRawValue())
    this.http.post(
      `http://localhost:3000/users/login`,

      this.reactiveForm.getRawValue()
    ).subscribe((res: any) => {
        localStorage.setItem(
          'token', res.token
        );
        localStorage.setItem(
          'user', JSON.stringify(res.user)
        );
        this.store.dispatch(new AddUser(res.user));
        this.router.navigate(['/todo-list']);
      }
    );
  }


}
