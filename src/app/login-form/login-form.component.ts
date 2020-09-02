import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
  /*template: `<h3>Login</h3>`*/
})
export class LoginFormComponent implements OnInit {

  hide = true;
  reactiveForm: FormGroup = this.fb.group({

    name: this.fb.control('',[
      Validators.required,
      // Validators.pattern(/[A-Za-zА-Яа-яЁё]{2,30}/)   WHY?!?
    ]),

    password: this.fb.control('', [
      Validators.required,
      // Validators.pattern(/[A-Za-zА-Яа-яЁё]{4,60}/)
    ]),
  });

  constructor(private fb: FormBuilder){}

  ngOnInit(){
    this.initForm();
  }

  initForm(){
    this.reactiveForm = this.fb.group({
      name: [null],
      password: [null]
    });
  }

}
