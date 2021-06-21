import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDropzone]'
})
export class DropzoneDirective {

  @Output() dropped = new EventEmitter<FileList>();
  @Output() hovered = new EventEmitter<boolean>();

  @HostListener('drop', ['$event'])
  // tslint:disable-next-line:typedef
  onDrop($event) {
    $event.preventDefault();
    this.dropped.emit($event.dataTransfer.files);
    this.hovered.emit(false);
  }

  @HostListener('dragover', ['$event'])
  // tslint:disable-next-line:typedef
  onDragOver($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }

  @HostListener('dragleave', ['$event'])
  // tslint:disable-next-line:typedef
  onDragLeave($event) {
    $event.preventDefault();
    this.hovered.emit(false);
  }
}
