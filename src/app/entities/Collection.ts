import { Post } from './Post';

export class Collection {
  id;
  title?: string;
  description?: string;
  createdDate: Date;
  status: string;
  posts?: Post[];
  pinned?: boolean;

  constructor() {
    this.title = '';
    this.description = '';
    this.createdDate = new Date();
    this.status = '';
    this.posts = [];
    this.pinned = false;
  }
}
