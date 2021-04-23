import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topmenubar',
  templateUrl: './topmenubar.component.html',
  styleUrls: ['./topmenubar.component.scss']
})
export class TopmenubarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickShowLogin(): void {
    this.router.navigate(['login']);
  }

  onClickShowSignup(): void {
    this.router.navigate(['signup']);
  }
}
