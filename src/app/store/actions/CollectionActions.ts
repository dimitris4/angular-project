import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../Store';
import { Collection } from 'src/app/entities/Collection';
import { CollectionsService } from '../../collections/service/collections.service';

@Injectable({ providedIn: 'root'})
export class CollectionActions {

  constructor(private ngRedux: NgRedux<AppState>, private collectionsService: CollectionsService) {}

  static ADD_COLLECTION = 'ADD_COLLECTION';
  static UPDATE_COLLECTION = 'UPDATE_COLLECTION';
  static DELETE_COLLECTION = 'DELETE_COLLECTION';
  static READ_COLLECTIONS = 'READ_COLLECTIONS';

  readCollections(): void {
    this.collectionsService.readCollections()
      .subscribe((result: any) => {
        const collections: Collection[] = [];
        if (result) {
          for (const [key, value] of Object.entries(result)) {
            const item: any = value;
            item.id = key;
            collections.push(item as Collection);
          }
        }
        console.log(collections);
        this.ngRedux.dispatch({
          type: CollectionActions.READ_COLLECTIONS,
          payload: collections
        });
      });
  }

  addCollection(newCollection: Collection): void {
    this.collectionsService.saveCollection(newCollection)
      .subscribe((result: any) => {
        // newPost.id = result.name;
        this.ngRedux.dispatch({
          type: CollectionActions.ADD_COLLECTION,
          payload: newCollection
        });
      });
  }

  updateCollection(updatedCollection: Collection): void {
    this.collectionsService.updateCollection(updatedCollection)
      .subscribe((result: any) => {
        this.ngRedux.dispatch({
          type: CollectionActions.UPDATE_COLLECTION,
          payload: updatedCollection
        });
      });
  }

  deleteCollection(updatedCollection: Collection): void {
    console.log('inside the action', updatedCollection);
    this.ngRedux.dispatch({
      type: CollectionActions.DELETE_COLLECTION,
      payload: updatedCollection
    });
  }
}
