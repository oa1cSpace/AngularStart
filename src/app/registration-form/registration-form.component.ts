import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  hide = true;
  reactiveForm: FormGroup = this.fb.group({

    name: this.fb.control('',[
      Validators.required,
      // Validators.pattern(/[A-Za-zА-Яа-яЁё]{2,30}/)   WHY?!?
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
  getErrorMessage = {email: ''};

  constructor(private fb: FormBuilder){}

  // tslint:disable-next-line:typedef
  ngOnInit(){
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
}
