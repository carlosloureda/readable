// See 'Note on fetch' on the redux async example
import fetch from 'cross-fetch'
import {
    fetchPostsApi, votePostApi, fetchAllCategories, addPostApi,
    deletePost, getPostApi, updatePost
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

/*******************************************************************************
 *                             ADD POST
 ******************************************************************************/

 export const ADD_POST = 'ADD_POST'
function addPostAction(post) {
    console.log("inside addpost action : ", post);
    return {
        type: ADD_POST,
        post: post,
        receivedAt: Date.now()
    }
}
export function addPost(post) {
    return function(dispatch) {
        return addPostApi(post)
        .then(data =>{
            console.log("on add post callback: ", data);
            dispatch(addPostAction(data));}
        )
    }
}

/*******************************************************************************
 *                              REMOVE POST
 ******************************************************************************/
export const REMOVE_POST = 'REMOVE_POST'
function removePostAction(post) {
    return {
        type: REMOVE_POST,
        post: post,
        receivedAt: Date.now()
    }
}
export function removePost(id) {
    return function(dispatch) {
        return deletePost(id)
        .then(data =>{
            console.log("Data is : ",data);
            dispatch(removePostAction(data));}
        )
    }
}

/*******************************************************************************
 *                              FETCH ONE POST
 ******************************************************************************/

export const FETCH_POST = 'FETCH_POST'
function requestPost(post) {
    return {
        type: FETCH_POST,
        post: post,
        receivedAt: Date.now()
    }
}
export function fetchPost(postId) {
    return (dispatch) => {
        return getPostApi(postId)
        .then(data =>{
            console.log("Data is : ",data);
            return dispatch(requestPost(data));
        })
    }
}

/*******************************************************************************
 *                              EDIT POST
 ******************************************************************************/
export const EDIT_POST = 'EDIT_POST'
function editPostAction(post) {
    return {
        type: EDIT_POST,
        post: post,
        receivedAt: Date.now()
    }
}
export function editPost(id, payload) {
    return function(dispatch) {
        return updatePost(id, payload)
        .then(data =>{
            console.log("Data is : ",data);
            dispatch(editPostAction(data));}
        )
    }
}