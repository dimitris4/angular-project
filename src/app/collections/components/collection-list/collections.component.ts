import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectionsService } from '../../service/collections.service';
import { CollectionActions } from '../../../store/actions/CollectionActions';
import { AppState } from '../../../store/Store';
import { MatDialog } from '@angular/material/dialog';
import {Collection} from '../../../entities/Collection';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  public collections: Collection[];
  public displayedColumns: string[] = ['title', 'createdDate', 'contents', 'status', 'edit'];

  constructor(
    private router: Router,
    private postsService: CollectionsService,
    private ngRedux: NgRedux<AppState>,
    private collectionActions: CollectionActions,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.collectionActions.readCollections();
    this.ngRedux.select(state => state.collections).subscribe(res => {
      this.collections = res.collections;
    });
  }

  editPost(id: any): void {
    this.router.navigate(['home/neweditpost', {myId: id}]);
  }
}
