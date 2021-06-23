import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserActions } from '../store/actions/UserActions';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../store/Store';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login', // name of component
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  serverError: string;
  loginForm = this.fb.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userActions: UserActions,
    private ngRedux: NgRedux<AppState>,
    private authService: AuthService) {}

  ngOnInit(): void {}

  // getter for easy access to form fields
  get f(): any { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    // tries to log in
    if (this.loginForm.valid) {
      this.userActions.login(this.loginForm.value.email, this.loginForm.value.password);
    }
    // subscribes to redux store to see if there is any server error
    this.ngRedux
      .select(state => state.errors)
      .subscribe(res => {
        this.serverError = res.error.message;
        if (this.authService.isLoggedIn) {
          this.router.navigate(['home/posts']);
        } else {
          return;
        }
      });
  }
}
