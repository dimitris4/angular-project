import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../../service/post.service';
import { Post } from '../../../entities/Post';
import { PostActions } from '../../../store/actions/PostActions';
import { AppState } from '../../../store/Store';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public posts: Post[];
  public displayedColumns: string[] = ['title', 'createdDate', 'type', 'activity', 'status', 'edit'];

  constructor(
    private router: Router,
    private postsService: PostsService,
    private ngRedux: NgRedux<AppState>,
    private postActions: PostActions
  ) { }

  ngOnInit(): void {
    this.ngRedux.select(state => state.posts).subscribe(res => {
      // this.isHappy = res.isHappy;
      this.posts = res.posts;
    });
    // this.posts = this.postsService.getPosts();
  }

  editPost(id: any): void {
    this.router.navigate(['neweditpost', {myId: id}]);
  }

}
