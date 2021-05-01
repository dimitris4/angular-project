import {User} from './User';

export class Post {
  id?: string;
  createdDate: Date;
  title: string;
  text: string;
  media?: string;
  collections?: Array<string>;
  comments?: Array<Comment>;
  status: string;
  collaboration?: User[];
  pinned?: boolean;

  constructor() {
    this.title = '';
    this.text = '';
    this.collections = [];
    this.pinned = false;
  }
}

export class Comment {
  id: string;
  author: UserVm;
  createdDate: Date;
  text: string;
}

export class UserVm {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}
