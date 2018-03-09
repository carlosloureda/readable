// See 'Note on fetch' on the redux async example
import fetch from 'cross-fetch'
import {
    fetchPostsApi, votePostApi, fetchAllCategories
} from '../utils/api';

/*******************************************************************************
 *                              FECTCH POSTS
 ******************************************************************************/

// from https://redux.js.org/advanced/async-actions
export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(category) {
    return {
        type: REQUEST_POSTS,
        category
    }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(category, data) {
    console.log("JSON: ", data);
  return {
    type: RECEIVE_POSTS,
    category,
    items: data,
    receivedAt: Date.now()
  }
}

// thunk action creator, 'action creator' that lets us return a function
export function fetchPosts(category, sortedBy) {
    return (dispatch) => {
        // First dispatch: the app state is updated to inform
        // that the API call is starting.
        dispatch(requestPosts(category))
        return fetchPostsApi(category)
        .then(data =>
            {
                return dispatch(receivePosts(category,  data));
            }
        )

    }
}

/*******************************************************************************
 *                              VOTE POSTS
 ******************************************************************************/

export const VOTE_POST = 'VOTE_POST'

function votePostAction(postId, option) { // 'upVote', 'downVote'
    return {
        type: VOTE_POST,
        postId: postId,
        option: option,
        receivedAt: Date.now()
    }
}
export function votePost(postId, option) {
    return function(dispatch) {
        return votePostApi(postId, option)
        .then(data =>{
            console.log("Data is : ",data);
            dispatch(votePostAction(postId, option));}
        )
    }
}

/*******************************************************************************
 *                              FETCH CATEGORIES
 ******************************************************************************/

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
function requestCategoriesAction(items) {
    return {
        type: REQUEST_CATEGORIES,
        categories: items,
        receivedAt: Date.now()
    }
}

export function requestCategories() {
    return function(dispatch) {
        return fetchAllCategories()
        .then(data =>{
            console.log("*****************Data is : ",data);
            dispatch(requestCategoriesAction(data));}
        )
    }
}

/*******************************************************************************
 *                             SET SELECTED CATEGORY
 ******************************************************************************/

export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY'
function setSelectedCategory(category) {
    return {
        type: SET_SELECTED_CATEGORY,
        selectedCategory: category
    }
}
