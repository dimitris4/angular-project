import { Post } from 'src/app/entities/Post';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../store/Store';
import { PostActions } from '../store/actions/PostActions';
import { NgRedux } from '@angular-redux/store';
import {User} from '../entities/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public posts: Post[];
  public user: User;
  public showMoreInvitations: boolean;
  public showMoreCollaborations: boolean;

  constructor(
    private ngRedux: NgRedux<AppState>,
    private postActions: PostActions,
  ) { }

   ngOnInit(): void {
     this.postActions.readPosts();
     this.ngRedux.select(state => state.posts).subscribe(res => {
       this.user = JSON.parse(localStorage.getItem('user'));
       this.posts = res.posts.filter(post => post.collaborations !== undefined);
      });
     this.showMoreInvitations = false;
     this.showMoreCollaborations = false;
  }

  showInvitations(): void {
    this.showMoreInvitations = !this.showMoreInvitations;
  }

  showCollaborations(): void {
    this.showMoreCollaborations = !this.showMoreCollaborations;
  }

  acceptCollaboration(post): void {
    const newPost = post;
    newPost.collaborations.forEach(col => {
      if (col.email === this.user.email) {
        col.accepted = true;
      }
    });
    this.postActions.updatePost(newPost);
  }

  removeCollaboration(post): void {
    post.collaborations = post.collaborations.filter(col => col.email !== this.user.email);
    this.postActions.updatePost(post);
  }

  getInvitations(): Post[] {
    const invitations = [];
    for (const post of this.posts) {
      for (const collaboration of post.collaborations) {
        if (collaboration.email === this.user.email && !collaboration.accepted) {
          invitations.push(post);
        }
      }
    }
    return invitations;
  }

  getCollaborations(): Post[] {
    const collaborations = [];
    for (const post of this.posts) {
      for (const collaboration of post.collaborations) {
        if (collaboration.email === this.user.email && collaboration.accepted) {
          collaborations.push(post);
        }
      }
    }
    return collaborations;
  }

  getInvitationsLength(): number {
    const invitations = [];
    for (const post of this.posts) {
      for (const collaboration of post.collaborations) {
        if (collaboration.email === this.user.email && !collaboration.accepted) {
          invitations.push(post);
        }
      }
    }
    return invitations.length;
  }

  getCollaborationsLength(): number {
    const collaborations = [];
    for (const post of this.posts) {
      for (const collaboration of post.collaborations) {
        if (collaboration.email === this.user.email && collaboration.accepted) {
          collaborations.push(post);
        }
      }
    }
    return collaborations.length;
  }
}
