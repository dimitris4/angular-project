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

  public profile;
  public descriptionBlocks = [{header: 'this.profile.header', body: 'this.profile.body'}];

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

  addDescriptionBlock(): void {
    this.descriptionBlocks.push({header: '', body: ''});
  }

  removeDescriptionBlock(): void {
    this.descriptionBlocks.pop(); // not the last one always
  }
}
