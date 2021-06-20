import {NgRedux} from '@angular-redux/store';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PostsService} from '../../service/posts.service';
import {Post} from '../../../entities/Post';
import {PostActions} from '../../../store/actions/PostActions';
import {AppState} from '../../../store/Store';
import {MatDialog} from '@angular/material/dialog';
import {AlertBoxComponent} from '../../../alert-box/alert-box.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public posts: Post[];
  public newPostCreated = true;
  public displayedColumns: string[] = ['title', 'createdDate', 'type', 'activity', 'status', 'edit'];

  constructor(
    private router: Router,
    private postsService: PostsService,
    private ngRedux: NgRedux<AppState>,
    private postActions: PostActions,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const postDeleted = history.state.postDeleted || false; // browser property
    // if a post has been deleted, do not make an API request
    if (!postDeleted) {
      this.postActions.readPosts();
    }
    this.ngRedux.select(state => state.posts).subscribe(res => {
      this.posts = res.posts;
    });
    // if (this.newPostCreated) {
    //   this.dialog.open(AlertBoxComponent);
    // }
  }

  editPost(id: any): void {
    this.router.navigate(['home/neweditpost', {myId: id}]);
  }

}
