import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppState} from '../store/Store';
import {NgRedux} from '@angular-redux/store';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-topmenubar',
  templateUrl: './topmenubar.component.html',
  styleUrls: ['./topmenubar.component.scss']
})
export class TopmenubarComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onClickLogin(): void {
    this.router.navigate(['login']);
  }

  onClickSignup(): void {
    this.router.navigate(['signup']);
  }

  onClickLogout(): void {
    this.authService.signOut();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
}
