import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {User} from '../entities/User';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userInfo: User;
  public hasDataLoaded = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder) {
  }

  public profile;
  // public descriptionBlocks = [{header: '', body: ''}];
  public header;
  public body;
  public email;
  public contact;

  public profileForm = this.fb.group({
    header: '',
    body: '',
    email: '',
    contact: ''
  });


  ngOnInit(): void {
    this.authService.getLoggedInUserInfo().subscribe(res => {
      if (res) {
        for (const [key, value] of Object.entries(res)) {
          const userId = JSON.parse(localStorage.getItem('user')).id;
          const user = value as User;
          if (user.id === userId) {
            this.userInfo = user;
            console.log(this.userInfo);
            localStorage.setItem('userId', key);
            this.hasDataLoaded = true;

            this.profileForm = this.fb.group({
              header: [this.userInfo.header],
              body: [this.userInfo.body],
              email: [this.userInfo.email],
              contact: [this.userInfo.contact]
            });
          }
        }
      }
    });

  }

  onSubmit(): void {
    Object.assign(this.userInfo, this.profileForm.value);
    console.log(this.profileForm.value);
    this.authService.updateUserInfo(this.userInfo).subscribe(res => {
      console.log(res);
    });
  }

  // addDescriptionBlock(): void {
  //   this.descriptionBlocks.push({header: '', body: ''});
  // }
  //
  // removeDescriptionBlock(): void {
  //   this.descriptionBlocks.pop(); // not the last one always
  // }
}
