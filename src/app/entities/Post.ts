export class Post {
  id: string;
  createdDate: Date;
  title: string;
  text: string;
  media?: string;
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
