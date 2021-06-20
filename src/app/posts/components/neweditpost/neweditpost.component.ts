import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../service/posts.service';
import { Post } from '../../../entities/Post';
import { User } from '../../../entities/User';
import { PostActions } from '../../../store/actions/PostActions';
import { AppState } from '../../../store/Store';
import { Collection } from '../../../entities/Collection';
import {AuthService} from '../../../auth.service';
import {Collaboration} from '../../../entities/Collaboration';

@Component({
  selector: 'app-neweditpost',
  templateUrl: './neweditpost.component.html',
  styleUrls: ['./neweditpost.component.scss']
})
export class NeweditpostComponent implements OnInit {
  public selectedPost;
  public postForm: FormGroup;
  public title: string;
  public editMode: boolean;
  public published: boolean;
  public organisationList: User[];
  // replace dummy data with API call in the future
  public availableCollections: Collection[] = [
    {id: '1', title: 'My favorite collection', createdDate: new Date(), status: 'DRAFT'},
    {id: '2', title: 'Events collection', createdDate: new Date(), status: 'DRAFT'},
    {id: '3', title: 'Classroom collection', createdDate: new Date(), status: 'DRAFT'},
    {id: '4', title: 'Summer collection', createdDate: new Date(), status: 'DRAFT'}];

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private postActions: PostActions,
    private ngRedux: NgRedux<AppState>
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        if (params.get('id') === 'create') {
          this.selectedPost = new Post();
          this.title = 'New post';
          this.editMode = false;
        } else {
          const id = params.get('id');
          this.ngRedux.select(state => state.posts).subscribe(res => {
            this.selectedPost = res.posts.find(post => post.id === id);
          });
          this.title = 'Edit post';
          this.editMode = true;
        }
      });
    this.postForm = this.fb.group({
      title: [this.selectedPost.title],
      createdDate: [this.selectedPost.createdDate],
      text: [this.selectedPost.text],
      id: [this.selectedPost.id],
      media: [this.selectedPost.media],
      collections: [this.selectedPost.collections],
      pinned: [this.selectedPost.pinned],
      collaborations: [this.selectedPost.collaborations],
    });
    // calls directly the service
    this.organisationList = this.authService.getOrganisations();
  }

  onSubmit(): void {
    this.selectedPost = this.postForm.value;

    const collaborationArray = [];
    if (this.postForm.controls.collaborations.value.length > 0) {
      for (const item of this.postForm.controls.collaborations.value) {
        const newCollaboration = new Collaboration();
        newCollaboration.email = item.email;
        collaborationArray.push(newCollaboration);
      }
    }
    this.selectedPost.collaborations = collaborationArray;

    // maybe in the future replace the email with the organisation name
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    this.selectedPost.author = loggedInUser.email;

    this.published ? this.selectedPost.status = 'PUBLISHED' : this.selectedPost.status = 'DRAFT';
    console.log(this.selectedPost);
    if (this.postForm.valid) {
      // saves the post in the service and navigates to the posts list
      if (!this.editMode) {
        // this.selectedPost.id = String(Math.floor(Math.random() * 100));
        this.selectedPost.createdDate = new Date();
        this.postActions.addPost(this.selectedPost);
      } else {
        this.postActions.updatePost(this.selectedPost);
      }
      this.router.navigate(['home/posts']);
    }
  }

  removeCollectionOnClick(id): void {
    this.postForm.patchValue({
      collections: this.postForm.controls.collections.value.filter(a => a.id !== id),
    });
  }

  removeOrganisationOnClick(id): void {
    this.postForm.patchValue({
      collaborations: this.postForm.controls.collaborations.value.filter(a => a.id !== id),
    });
  }

  changeStatusDraft(): void {
    this.published = false;
    this.onSubmit();
  }

  changeStatusPublished(): void {
    this.published = true;
    this.onSubmit();
  }

  deletePostOnClick(): void {
    this.postActions.deletePost(this.selectedPost);
    this.router.navigate(['home/posts']);
  }
}
