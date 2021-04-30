import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, ValidatorFn } from '@angular/forms';
// import custom validator to validate that password and confirm password fields match
import { MustMatch } from './_helpers/must-match.validator';
import {Router} from '@angular/router';
import {UserActions} from '../store/actions/UserActions';
import { NgRedux } from '@angular-redux/store';
import {AppState} from '../store/Store';
import {ServerError} from '../entities/ServerError';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  serverError = '';
  registrationForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      retypePassword: ['', [Validators.required]],
      firstName: [''],
      lastName: [''],
      acceptTerms: [false, Validators.requiredTrue]
    },
    {
      validator: MustMatch('password', 'retypePassword')
    }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userActions: UserActions,
    private ngRedux: NgRedux<AppState>) {}

  ngOnInit(): void {}

  // getter for easy access to form fields
  get f(): any { return this.registrationForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }
    this.userActions.signup(this.registrationForm.value.email, this.registrationForm.value.password);
    this.ngRedux
      .select(state => state.errors)
      .subscribe(res => {
        this.serverError = res.error.message;
        if (this.serverError !== '') {
          return;
        } else {
          this.router.navigate(['login']);
        }
      });
  }
}
