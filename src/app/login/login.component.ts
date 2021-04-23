import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {User} from '../entities/User';
import {UserActions} from '../store/actions/UserActions';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../store/Store';

@Component({
  selector: 'app-login', // name of component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  serverError: string;

  // DI - Dependency injection
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userActions: UserActions,
    private ngRedux: NgRedux<AppState>) {}

  ngOnInit(): void{
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]], // multiple validators
        password: ['', Validators.required] // Single validator
      }
    );
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.userActions.login(this.loginForm.value.username, this.loginForm.value.password);
    }
    this.ngRedux
      .select(state => state.errors)
      .subscribe(res => {
        this.serverError = res.error.message;
        if (this.serverError === '' && this.loginForm.valid){
          this.router.navigate(['home/posts']);
        } else {
          return;
        }
      });
  }
}
