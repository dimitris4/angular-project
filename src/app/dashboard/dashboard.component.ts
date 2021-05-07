import { Collaboration } from './../entities/Collaboration';
import { Post } from 'src/app/entities/Post';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppState } from '../../app/store/Store';
import { PostActions } from '../../app/store/actions/PostActions'
import { NgRedux } from '@angular-redux/store';
import { PostsService } from '../posts/service/posts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public posts: Post[];
  public user;
  public invitations;
  public collaborations;
  public showMoreInvitations;
  public showMoreCollaborations;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private postActions: PostActions,
    private postsService: PostsService,
  ) { }

   ngOnInit(): void {

   this.postActions.readPosts();
    this.ngRedux.select(state => state.posts).subscribe(res => {

      this.user = JSON.parse(localStorage.getItem('user'));

     this.invitations = res.posts
                .filter(post => post.collaborations
                .some(collaboration => collaboration.email === this.user.email && collaboration.accepted === false));

      this.collaborations = res.posts
                .filter(post => post.collaborations
                .some(collaboration => collaboration.email === this.user.email && collaboration.accepted === true));

    });



    this.showMoreInvitations = false;
    this.showMoreCollaborations = false;

  }

  showInvitations() {
    this.showMoreInvitations = !this.showMoreInvitations;
  }
  showCollaborations() {
    this.showMoreCollaborations = !this.showMoreCollaborations;
  }

  acceptCollaboration(post){
    const newPost = post;
    newPost.collaborations.forEach(col => {
      if(col.email === this.user.email)
        col.accepted = true;
    });
    this.postActions.updatePost(newPost);
  }


  removeCollaboration(post){
    post.collaborations = post.collaborations.filter(col => col.email !== this.user.email);
    this.postActions.updatePost(post);
  }

}
