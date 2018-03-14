import fetch from 'isomorphic-fetch'

const HEADERS = {
    'Authorization': 'token-usuario-super-especial-xvx19',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
const url = 'http://localhost:3001';

export const getUUIC = () => Math.floor((1 + Math.random()) * 0x1000).toString(16)
                            + (Date.now()* 0X10000).toString(16);

export function fetchPostsApi(category) {
    return (category) ? fetchPostInCategory(category) : fetchAllPosts();
}

/**
 * @description GET /posts. Get all of the posts. Useful for the main page when no category is selected.
 */
export function fetchAllPosts () {
    return fetch(`${url}/posts`, {headers: HEADERS})
    .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.error('[fetchAllPosts] | An error occured.', error)
    )
      //.then((hits) => hits.map(( post) => post)
}

/**
 * @description POST /posts/:id option - [String]: Either "upVote" or "downVote".
 * option - [String]: Either "upVote" or "downVote".
 */
export function votePostApi(postId, option) {
    return fetch(
        `${url}/posts/${postId}`,
        { method: 'POST', headers: HEADERS, body: JSON.stringify({'option': option}) }
    )
    .then(
        response => response.json(),
        error => console.log('[votePostApi] | An error occured.', error)
    )
}

/**
 * @description GET /posts/:id. Get the details of a single post.
 */
export function getPostApi(postId) {
    return fetch(
        `${url}/posts/${postId}`, { method: 'GET', headers: HEADERS }
    )
    .then(
        response => response.json(),
        error => console.log('[votePostApi] | An error occured.', error)
    )
}

/**
 * @description GET /categories.
 * Get all of the categories available for the app. List is found in categories.js.
 * Feel free to extend this list as you desire
 */
export function fetchAllCategories () {
    return fetch(`${url}/categories`, {headers: HEADERS})
    .then(
        response => response.json(),
        error => console.log('[fetchAllCategories] | An error occured.', error)
    )
    .then(
        data => data.categories,
        error => console.log('[fetchAllCategories] | An error occured.', error)
    )
}

/**
 * @description GET /:category/posts. Get all of the posts for a particular category.
 */
export function fetchPostInCategory (category) {
    return fetch(`${url}/${category}/posts`, {headers: HEADERS})
    .then(
        response => response.json(),
        error => console.log('[fetchPostInCategory] | An error occured.', error)
    )
      //.then((hits) => hits.map(( post) => post)
}


/**
 * @description POST /posts. Add a new post.
 *
 * id - UUID should be fine, but any unique id will work
 * timestamp - [Timestamp] Can in whatever format you like, you can use Date.now() if you like.
 * title - [String]
 * body - [String]
 * author - [String]
 * category - Any of the categories listed in categories.js. Feel free to extend this list as you desire.
 */
export function addPostApi (body) {
    body = JSON.stringify(body);
    return fetch(
        `${url}/posts`,
        { method: 'POST', headers: HEADERS, body: body }
    )
    .then(
        response => response.json(),
        error => console.log('[addPostApi] | An error occured.', error)
    )
}

/**
 * @description DELETE /posts/:id, Sets the deleted flag for a post to 'true'.
 *               Sets the parentDeleted flag for all child comments to 'true'.
 */
export function deletePost (id) {
    return fetch(`${url}/posts/${id}`, { method: 'DELETE', headers: HEADERS })
    .then(
        response => response.json(),
        error => console.log('[deletePost] | An error occured.', error)
    )
}

/**
 * @description PUT /posts/:id, Edit the details of an existing post.
 * title - [String]
 * body - [String]
 */
export function updatePost (id, payload) {
    return fetch(`${url}/posts/${id}`, {
        method: 'PUT',
        headers: HEADERS,
        // body: JSON.stringify({'title': title, 'body': body})
        body: JSON.stringify(payload)
    })
    .then(
        response => response.json(),
        error => console.log('[updatePost] | An error occured.', error)
    )
}

/** COMMENTS */

/**
 * @description GET /posts/:id/comments, Get all the comments for a single post.
 */
export function getPostCommentsApi(postId) {
    return fetch(
        `${url}/posts/${postId}/comments`, { method: 'GET', headers: HEADERS }
    )
    .then(
        response => response.json(),
        error => console.log('[getPostCommentsApi] | An error occured.', error)
    )
}

/**
 * @description POST /comments. Add a comment to a post
 * id - Any unique ID. As with posts, UUID is probably the best here.
 * timestamp - [Timestamp] Get this however you want.
 * body - [String]
 * author - [String]
 * parentId - Should match a post id in the database.
 */
export function addCommentApi(body) {
    body = JSON.stringify(body);
    return fetch( `${url}/comments`, {
        method: 'POST',
        headers: HEADERS,
        body: body
    })
    .then(
        response => response.json(),
        error => console.error('[addCommentApi] | An error occured.', error)
    )
}

/**
 * @description GET /comments/:id, Get the details for a single comment.
 */
export function getCommentApi(commentId) {
    return fetch( `${url}/comments/${commentId}`, { method: 'GET', headers: HEADERS })
    .then(
        response => response.json(),
        error => console.log('[getCommentApi] | An error occured.', error)
    )
}

/**
 * @description POST /comments/:id. Used for voting on a comment.
 * option - [String]: Either "upVote" or "downVote".
 */
export function voteCommentApi(commentId, option) {
    return fetch(
        `${url}/comments/${commentId}`,
        { method: 'POST', headers: HEADERS, body: JSON.stringify({'option': option}) }
    )
    .then(
        response => response.json(),
        error => console.log('[voteCommentApi] | An error occured.', error)
    )
}

/**
 * @description PUT /comments/:id, Edit the details of an existing comment.
 * timestamp - timestamp. Get this however you want.
 * body - [String]
 */
export function updateComment (id, payload) {
    return fetch(`${url}/comments/${id}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(payload)
    })
    .then(
        res => res.json(),
        error => console.log('[updateComment] | An error occured.', error)
    )
}

/**
 * @description DELETE /comments/:id
 * Sets a comment's deleted flag to true.
 */
export function deleteComment (id) {
    return fetch(`${url}/comments/${id}`, { method: 'DELETE', headers: HEADERS })
    .then(
        res => res.json(),
        error => console.log('[deleteComment] | An error occured.', error)
    )
}