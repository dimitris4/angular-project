import {NgRedux} from '@angular-redux/store';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PostsService} from '../../service/posts.service';
import {Post} from '../../../entities/Post';
import {PostActions} from '../../../store/actions/PostActions';
import {AppState} from '../../../store/Store';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  public posts: Post[];
  public newPostCreated = true;
  public displayedColumns: string[] = ['title', 'createdDate', 'type', 'activity', 'status', 'edit'];
  public loggedInUser = JSON.parse(localStorage.getItem('user'));

  constructor(
    private router: Router,
    private postsService: PostsService,
    private ngRedux: NgRedux<AppState>,
    private postActions: PostActions,
  ) { }

  ngOnInit(): void {
    const postDeleted = history.state.postDeleted || false; // browser property
    // if a post has been deleted, do not make an API request
    if (!postDeleted) {
      this.postActions.readPosts();
    }
    this.ngRedux.select(appState => appState.posts).subscribe(res => {
      this.posts = res.posts;
    });
  }

  editPost(id: any): void {
    this.router.navigate(['home/neweditpost', {myId: id}]);
  }

  onClickLikePost(post: Post): void {
    this.ngRedux.select(appState => appState.users).subscribe(res => {
      if (this.isPostLiked(post)) {
        post.likes = post.likes.filter(user => user.email !== this.loggedInUser.email);
        this.postActions.updatePost(post);
        return;
      }
      post.likes.push(this.loggedInUser);
      this.postActions.updatePost(post);
    });
  }

  isPostLiked(post): boolean {
    return post.likes.filter(user => user.email === this.loggedInUser.email).length > 0;
  }
}
