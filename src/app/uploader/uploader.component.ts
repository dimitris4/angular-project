import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit {

  @Output() downloadURL: EventEmitter<string> = new EventEmitter();

  isHovering: boolean;

  files: File[] = [];

  toggleHover(event): void {
    this.isHovering = event;
  }

  onDrop(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  deleteTask(file): void {
    this.files = this.files.filter(x => x !== file);
  }

  sendUrl(downloadURL): void {
    this.downloadURL.emit(downloadURL);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
