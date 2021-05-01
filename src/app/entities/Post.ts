import { User } from 'src/app/entities/User';
export class Post {
  id: string;
  createdDate: Date;
  title: string;
  text: string;
  media?: string;
  collaborations?: Array<User>;
  collections?: Array<string>;
  comments?: Array<Comment>;
  status: string;

  constructor() {
    this.title = '';
    this.text = '';
    this.collections = [];
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
