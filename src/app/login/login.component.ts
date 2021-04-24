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
  loginForm: FormGroup;
  serverError: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userActions: UserActions,
    private ngRedux: NgRedux<AppState>,
    private authService: AuthService) {}

  ngOnInit(): void{
    this.loginForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', Validators.required]
      }
    );
  }

  onSubmit(): void {
    // tries to log in
    if (this.loginForm.valid) {
      this.userActions.login(this.loginForm.value.username, this.loginForm.value.password);
    }
    // subscribes to redux store to see if there is any server error
    this.ngRedux
      .select(state => state.errors)
      .subscribe(res => {
        this.serverError = res.error.message;
        if (this.authService.isLoggedIn) {
          this.router.navigate(['home']);
        } else {
          return;
        }
      });
  }
}
