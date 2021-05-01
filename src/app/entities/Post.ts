import {Collaboration} from './Collaboration';
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
  collaborations?: Collaboration[];
  pinned?: boolean;
  author?: string;

  constructor() {
    this.title = '';
    this.text = '';
    this.collections = [];
    this.pinned = false;
    this.collaborations = [];
  }
}
//
// export class Comment {
//   id: string;
//   author: UserVm;
//   createdDate: Date;
//   text: string;
// }
//
// export class UserVm {
//   id: string;
//   firstName: string;
//   lastName: string;
//   profileImage?: string;
// }
