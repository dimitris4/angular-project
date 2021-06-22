import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Post} from '../entities/Post';
import Checkbox from '@material-ui/core/Checkbox';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-add-posts-box',
  templateUrl: './add-posts-box.component.html',
  styleUrls: ['./add-posts-box.component.scss']
})
export class AddPostsBoxComponent implements OnInit {

  public posts: MatTableDataSource<Post>;
  public selectedPosts: Post[];
  public displayedColumns: string[] = ['title', 'createdDate', 'type', 'activity', 'select'];
  public selection: SelectionModel<Post>;

  constructor(public dialogRef: MatDialogRef<AddPostsBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.posts = new MatTableDataSource<Post>(data.posts);
    this.selectedPosts = data.selectedPosts;
    this.selection = new SelectionModel<Post>(true, this.selectedPosts);
  }

  ngOnInit(): void {
  }

  applyFilter(filterValue: string): any {
    this.posts.filter = filterValue.trim().toLowerCase();
  }

  onClickAddPosts(): void {
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.posts.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.posts.data.forEach(row => this.selection.select(row));
  }

  close(): void {
    this.dialogRef.close(this.selection.selected);
  }

  save(): void {
    this.dialogRef.close(this.selection.selected);
  }
}
