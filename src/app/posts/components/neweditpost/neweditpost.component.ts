import {NgRedux} from '@angular-redux/store';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '../../service/posts.service';
import {Post} from '../../../entities/Post';
import {User} from '../../../entities/User';
import {PostActions} from '../../../store/actions/PostActions';
import {AppState} from '../../../store/Store';
import {Collection} from '../../../entities/Collection';
import {AuthService} from '../../../auth.service';
import {Collaboration} from '../../../entities/Collaboration';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {AlertBoxComponent} from '../../../alert-box/alert-box.component';
import {CollectionsService} from '../../../collections/service/collections.service';

@Component({
  selector: 'app-neweditpost',
  templateUrl: './neweditpost.component.html',
  styleUrls: ['./neweditpost.component.scss']
})
export class NeweditpostComponent implements OnInit {
  public selectedPost: Post;
  public postForm: FormGroup;
  public title: string;
  public editMode: boolean;
  public published: boolean;
  public organisationList: User[];
  public selectedFile: File = null;
  // replace dummy data with API call in the future
  public availableCollections: Collection[];

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService,
    private collectionsService: CollectionsService,
    private fb: FormBuilder,
    private router: Router,
    private postActions: PostActions,
    private ngRedux: NgRedux<AppState>,
    private http: HttpClient,
    private dialog: MatDialog
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
            if (res.posts.length !== 0) {
              this.selectedPost = res.posts.find(post => post.id === id);
              localStorage.setItem('currentPost', JSON.stringify(this.selectedPost));
            } else {
              this.selectedPost = JSON.parse(localStorage.getItem('currentPost'));
            }
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
    this.availableCollections = this.collectionsService.getCollections();
  }

  onSubmit(): void {
    Object.assign(this.selectedPost, this.postForm.value);
    const collaborationArray = [];
    if (this.postForm.controls.collaborations.value !== null) {
      if (this.postForm.controls.collaborations.value.length > 0) {
        for (const item of this.postForm.controls.collaborations.value) {
          const newCollaboration = new Collaboration();
          newCollaboration.email = item.email;
          collaborationArray.push(newCollaboration);
        }
      }
    }
    this.selectedPost.collaborations = collaborationArray;

    // maybe in the future replace the email with the organisation name
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    this.selectedPost.author = loggedInUser.email;

    this.published ? this.selectedPost.status = 'PUBLISHED' : this.selectedPost.status = 'DRAFT';
    if (this.postForm.valid) {
      // creates new post
      if (!this.editMode) {
        // add 'likes' property to the new post
        const likes = [];
        const testUser = new User();
        testUser.id = 'newuserid';
        testUser.email = 'test@test.com';
        likes.push(testUser);
        this.selectedPost.likes = likes;
        this.selectedPost.createdDate = new Date();
        this.postActions.addPost(this.selectedPost);
        this.router.navigate(['home/posts'], {state: {postCreated: true}});
      } else {
        this.postActions.updatePost(this.selectedPost);
        this.router.navigate(['home/posts']);
      }
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
    const confirmDialog = this.dialog.open(AlertBoxComponent, {
      data: {
        title: 'Confirm Delete Post',
        message: 'Are you sure, you want to delete a post: ' + this.selectedPost.title,
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.postActions.deletePost(this.selectedPost);
        this.router.navigate(['home/posts'], {state: {postDeleted: true}});
      }
    });
  }

  onFileSelected(event): void {
    console.log(event);
    this.selectedFile = (event.target.files[0] as File);
  }

  onUpload(): void {
    const data = new FormData();
    data.append('image', this.selectedFile, this.selectedFile.name);
    // I Need the URL for this to work
    this.http.post('URL', data, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log('Upload Progres: ' + Math.round(event.loaded / event.total * 100) + '%');
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
        console.log(event);
      });
  }
}
