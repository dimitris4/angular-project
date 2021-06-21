import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '../../../posts/service/posts.service';
import {AuthService} from '../../../auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CollectionActions} from '../../../store/actions/CollectionActions';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../../../store/Store';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../../entities/User';
import {Collection} from '../../../entities/Collection';
import {AlertBoxComponent} from '../../../alert-box/alert-box.component';

@Component({
  selector: 'app-neweditcollection',
  templateUrl: './neweditcollection.component.html',
  styleUrls: ['./neweditcollection.component.scss']
})
export class NeweditcollectionComponent implements OnInit {
  public selectedCollection: Collection;
  public collectionForm: FormGroup;
  public title: string;
  public editMode: boolean;
  public published: boolean;
  public organisationList: User[];
  public selectedFile: File = null;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private collectionActions: CollectionActions,
    private ngRedux: NgRedux<AppState>,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        if (params.get('id') === 'create') {
          this.selectedCollection = new Collection();
          this.title = 'New collection';
          this.editMode = false;
        } else {
          const id = params.get('id');
          this.ngRedux.select(state => state.collections).subscribe(res => {
            this.selectedCollection = res.collections.find(collection => collection.id === id);
          });
          this.title = 'Edit collection';
          this.editMode = true;
        }
      });
    this.collectionForm = this.fb.group({
      title: [this.selectedCollection.title],
      description: [this.selectedCollection.description],
      posts: [this.selectedCollection.posts],
      pinned: [this.selectedCollection.pinned],
    });
  }

  onSubmit(): void {
    Object.assign(this.selectedCollection, this.collectionForm.value);
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (this.collectionForm.valid) {
      // creates new collection
      if (!this.editMode) {
        this.collectionActions.addCollection(this.selectedCollection);
        this.router.navigate(['home/collections'], {state: {collectionCreated: true}});
      } else {
        this.collectionActions.updateCollection(this.selectedCollection);
        this.router.navigate(['home/collections']);
      }
    }
  }

  deleteCollectionOnClick(): void {
    const confirmDialog = this.dialog.open(AlertBoxComponent, {
      data: {
        title: 'Confirm Delete Collection',
        message: 'Are you sure, you want to delete a collection: ' + this.selectedCollection.title,
      }
    });

    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.collectionActions.deleteCollection(this.selectedCollection);
        this.router.navigate(['home/collections'], {state: {collectionDeleted: true}});
      }
    });
  }

  changeStatusDraft(): void {
    console.log('change status to draft');
  }

  changeStatusPublished(): void {
    console.log('change status to published');
  }
}
