declare var require: any;
var deepFreeze = require('deep-freeze');
import { postsReducer, posts } from './../reducers/PostReducer';
import * as types from './../actions/PostActions';

describe('posts reducer', () => {
    it('should return the initial state', () => {
        expect(postsReducer(undefined, {})).toEqual({isHappy: true, posts: posts});
    });
    
    it('Toggle isHappy', () => {
        const oldState = {isHappy: true, posts: posts};
        const action = { type: types.PostActions.SET_HAPPY, payload: false };
        
        deepFreeze(oldState);
        
        const result = postsReducer(oldState, action);

        expect(result).toEqual({isHappy: false, posts: posts});
    });
});
