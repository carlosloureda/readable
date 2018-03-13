// See 'Note on fetch' on the redux async example
import fetch from 'cross-fetch'
import {
    fetchPostsApi, votePostApi, fetchAllCategories, addPostApi,
    deletePost, getPostApi, updatePost, getPostCommentsApi,
    addCommentApi, voteCommentApi, deleteComment, updateComment
} from '../utils/api';
import { sortPostsHelper } from '../utils/utils';

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
                // dispatch(sortPosts(data, sortedBy));
                // console.log("eoeoeooe: ", sortedBy);
                data = sortPostsHelper(data, sortedBy);
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

/*******************************************************************************
 *                              FETCH COMMENTS
 ******************************************************************************/
export const FETCH_COMMENTS = 'FETCH_COMMENTS'
function fetchCommentsAction(comments) {
    return {
        type: FETCH_COMMENTS,
        comments: comments,
        receivedAt: Date.now()
    }
}
export function fetchComments(postId) {
    return function(dispatch) {
        return getPostCommentsApi(postId)
        .then(data =>{
            dispatch(fetchCommentsAction(data));}
        )
    }
}

/*******************************************************************************
 *                              ADD COMMENT
 ******************************************************************************/
export const ADD_COMMENT = 'ADD_COMMENT'
function addCommentAction(comment) {
    return {
        type: ADD_COMMENT,
        comment: comment,
        receivedAt: Date.now()
    }
}
export function addComment(comment) {
    return function(dispatch) {
        return addCommentApi(comment)
        .then(data =>{
            dispatch(addCommentAction(data));}
        )
    }
}

/*******************************************************************************
 *                              VOTE COMMENT
 ******************************************************************************/
export const VOTE_COMMENT = 'VOTE_COMMENT'
function voteCommentAction(commentId, option) {
    return {
        type: VOTE_COMMENT,
        commentId: commentId,
        option: option,
        receivedAt: Date.now()
    }
}

export function voteComment(commentId, option) {
    return function(dispatch) {
        return voteCommentApi(commentId, option)
        .then(data =>{
            dispatch(voteCommentAction(commentId, option))}
        )
    }
}

/*******************************************************************************
 *                              DELETE COMMENT
 ******************************************************************************/
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
function removeCommentAction(commentId) {
    return {
        type: REMOVE_COMMENT,
        commentId: commentId,
        receivedAt: Date.now()
    }
}

export function removeComment(commentId) {
    return function(dispatch) {
        return deleteComment(commentId)
        .then(data =>{
            dispatch(removeCommentAction(commentId))}
        )
    }
}

/*******************************************************************************
 *                              EDIT COMMENT
 ******************************************************************************/
export const EDIT_COMMENT = 'EDIT_COMMENT'
function editCommentAction(comment) {
    return {
        type: EDIT_COMMENT,
        comment: comment,
        receivedAt: Date.now()
    }
}
export function editComment(id, payload) {
    return function(dispatch) {
        return updateComment(id, payload)
        .then(data =>{
            dispatch(editCommentAction(data))}
        )
    }
}

/*******************************************************************************
 *                              SORT POSTS
 ******************************************************************************/
export const SORT_POSTS = 'SORT_POSTS'
export function sortPosts(posts, sortedBy) {
    return {
        type: SORT_POSTS,
        posts: posts,
        sortedBy: sortedBy
    }
}
