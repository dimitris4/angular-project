import {Component, EventEmitter, Injectable, Input, OnInit, Output} from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.scss']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  @Output() delete: EventEmitter<File> = new EventEmitter();
  @Output() mediaURL: EventEmitter<string> = new EventEmitter();

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.startUpload();
  }

  startUpload(): void {
    const path = `test/${Date.now()}_${this.file.name}`;

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    this.percentage = this.task.percentageChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize( async () => {
        this.downloadURL = await ref.getDownloadURL().toPromise();

        await this.db.collection('files').add({downloadURL: this.downloadURL, path});

        this.mediaURL.emit(this.downloadURL);
      })
    );
  }

  isActive(snapshot): boolean {
    return snapshot.state === 'running'
    && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  deleteFile(downloadURL): void{
    this.storage.storage.refFromURL(downloadURL).delete();
    const query = this.db.collection('files', ref => ref.where('downloadURL', '==', downloadURL));
    query.get().toPromise().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  }

  deleteTask(): void{
    this.delete.emit(this.file);
  }

}
