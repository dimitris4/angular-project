import { tassign } from 'tassign';
import { PostState } from '../Store';
import { PostActions } from '../actions/PostActions';
import { Post } from 'src/app/entities/Post';

export const posts = [
  {id: '1', createdDate: new Date(2021, 0, 2),
    title: 'Is there life out there', text: 'Something', collections: [], status: 'PUBLISHED'} as Post,
  {id: '2', createdDate: new Date(2021, 1, 2),
    title: 'Do androids dream of electric sheep?', text: 'Something', collections: [], status: 'PUBLISHED' } as Post,
  {id: '3', createdDate: new Date(2021, 2, 2),
    title: 'What other good questions are there?', text: 'Something', collections: [], status: 'PUBLISHED' } as Post,
  {id: '4', createdDate: new Date(2021, 3, 2),
    title: 'How many stars are there in the visible universe?', text: 'Something', collections: [], status: 'DRAFT' } as Post,
  {id: '5', createdDate: new Date(2021, 4, 2),
    title: 'What lies beyond the visible universe?', text: 'Something', collections: [], status: 'DRAFT' } as Post
];


const INITIAL_STATE: PostState = { posts };

export function postsReducer(state: PostState = INITIAL_STATE, action: any): PostState {
  switch (action.type) {
    case PostActions.UPDATE_POST:
      const newArray = [...state.posts]; // copy of the array.
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      newArray[index] = action.payload;
      return tassign(state, {posts: newArray});
    case PostActions.ADD_POST:
      // return tassign(state, {posts: state.posts.concat(action.payload)});
      return tassign(state, {posts: [...state.posts, action.payload]});
    case PostActions.DELETE_POST:
      return { posts: state.posts.filter(post => post.id !== action.payload.id) };
    default:
      return state;
 }
}
