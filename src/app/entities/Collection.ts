import { Post } from './Post';

export class Collection {
  id;
  title: string;
  createdDate: Date;
  status: string;
  posts?: Post[];
}
