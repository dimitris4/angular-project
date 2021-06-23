import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {User} from '../entities/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userInfo: User;
  public hasDataLoaded = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getLoggedInUserInfo().subscribe(res => {
      if (res) {
        for (const [key, value] of Object.entries(res)) {
          const userId = JSON.parse(localStorage.getItem('user')).id;
          const user = value as User;
          if (user.id === userId) {
            this.userInfo = user;
            this.hasDataLoaded = true;
          }
        }
      }
    });
  }
}
