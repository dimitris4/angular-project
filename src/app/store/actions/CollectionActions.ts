import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {AppState} from '../Store';
import {Collection} from 'src/app/entities/Collection';
import {CollectionsService} from '../../collections/service/collections.service';
import {PostsService} from '../../posts/service/posts.service';

@Injectable({providedIn: 'root'})
export class CollectionActions {

  constructor(
    private ngRedux: NgRedux<AppState>,
    private collectionsService: CollectionsService,
    private postsService: PostsService
  ) { }

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
        this.ngRedux.dispatch({
          type: CollectionActions.READ_COLLECTIONS,
          payload: collections
        });
      });
  }

  addCollection(newCollection: Collection): void {
    this.collectionsService.saveCollection(newCollection)
      .subscribe((result: any) => {
          // save collection id
          newCollection.id = result.name;
          this.collectionsService.updateCollection(newCollection).subscribe();
          // update each post in the collection
          const postsInCollection = newCollection.posts;
          postsInCollection.forEach(post => {
            if (!post.collections) {
              post.collections = [];
            }
            // create custom object to prevent circular call
            post.collections.push(
              {
                id: newCollection.id,
                title: newCollection.title,
              });
            this.postsService.updatePost(post).subscribe();
          });
          // update redux
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
    this.ngRedux.dispatch({
      type: CollectionActions.DELETE_COLLECTION,
      payload: updatedCollection
    });
  }
}
