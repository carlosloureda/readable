import { combineReducers } from 'redux';
import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    VOTE_POST,
    REQUEST_CATEGORIES,
    SET_SELECTED_CATEGORY,
    ADD_POST,
    REMOVE_POST,
    FETCH_POST,
    EDIT_POST,
    FETCH_COMMENTS,
    ADD_COMMENT,
    VOTE_COMMENT,
    REMOVE_COMMENT,
    EDIT_COMMENT,
    SORT_POSTS
} from '../actions/index'
import { sortPostsHelper, objectToArray, arrayToObject } from '../utils/utils';

const defaultPostState = {
    selectedCategory: 'all',
    selectedPostId: null,
    entities: {
        posts:{

        },
        comments: {

        }
    },
    postsByCategory:  {

    },
    categories: [
    ],
    //This should go elsewhere
    isFetching: false,
    didInvalidate: false,
    lastUpdated: null,
    selectedPostId: null
}

function posts(state = defaultPostState, action) {
    let _postsByCategory = null;
    switch (action.type) {
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false,
            }
        case RECEIVE_POSTS:
            // API returns an array, we parse to an object ...
            const newPosts =  action.items.reduce((acc, item) => {
                return {
                    ...acc,
                    ...{[item.id] : item}
                }
            }, {});
            let _posts = Object.assign({}, newPosts);
            if (action.category) {
                // If we asked by category we need to merge the new ones to the old ones
                //TODO: WE update the categories only that category
                _posts = Object.assign({}, state.entities.posts, newPosts)
            }

            _postsByCategory = state.postsByCategory;
            action.items.map(item => {
                if (_postsByCategory[item.category]) {
                    if (_postsByCategory[item.category].items
                        && _postsByCategory[item.category].items.indexOf(item.id) === -1)
                        {
                            _postsByCategory[item.category].items.push(item.id);
                        }

                } else  {
                    _postsByCategory[item.category] = {
                        isFetching: false,
                        didInvalidate: false,
                        lastUpdated: Date.now(),
                        items: [ item.id ]
                    }
                }
            })

            let newState = {
                ...state,
                isFetching: false,
                didInvalidate: false,
                entities: {
                    ...state.entities,
                    posts:  _posts
                },
                postsByCategory: _postsByCategory,
                lastUpdated: action.receivedAt,
                selectedCategory: (action.category) ? action.category : 'all',
                selectedPostId: state.selectedPostId,
            }
            return newState;
        case VOTE_POST:
            let voteScore = state.entities.posts[action.postId].voteScore;
            voteScore += (action.option == "upVote") ? 1 : -1;
            const newItem = Object.assign({}, state.entities.posts[action.postId]);
            newItem.voteScore = voteScore;
            let postId = action.postId;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    posts: {
                        ...state.entities.posts,
                        [postId]: newItem,
                    }
                },
                lastUpdated: action.receivedAt,
            }
        case REQUEST_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        case SET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.selectedCategory
            }

        case ADD_POST:
            _postsByCategory = state.postsByCategory;
            if (_postsByCategory[action.post.category]) {
                if (_postsByCategory[action.post.category].items
                    && _postsByCategory[action.post.category].items.indexOf(action.post.id) === -1)
                    {
                        _postsByCategory[action.post.category].items.push(action.post.id);
                    }

            } else  {
                _postsByCategory[action.post.category] = {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: Date.now(),
                    items: [ action.post.id ]
                }
            }

            // {
            //     ...state.postsByCategory,
            //     [action.post.category]: {
            //         ...state.postsByCategory[action.post.category],
            //         items: [
            //             ...state.postsByCategory[action.post.category].items,
            //             action.post.id
            //         ]
            //     }
            // },
            return {
                ...state,
                entities: {
                    ...state.entities,
                    posts: {
                        ...state.entities.posts,
                        [action.post.id]: action.post
                    }
                },
                postsByCategory: _postsByCategory,
                lastUpdated: action.receivedAt,
            }
        case REMOVE_POST:
            const postToBeRemoved = state.entities.posts[action.post.id];
            const _newPosts = JSON.parse(JSON.stringify(state.entities.posts));
            delete _newPosts[postToBeRemoved.id];

            const postsByCategoryToRemove = state.postsByCategory[action.post.category].items;
            postsByCategoryToRemove.splice(postsByCategoryToRemove.indexOf(action.post.id), 1)
            return {
                ...state,
                entities: {
                    ...state.entities,
                    posts: _newPosts
                },
                postsByCategory: {
                    ...state.postsByCategory,
                    [action.post.category]: {
                        ...state.postsByCategory[action.post.category],
                        items: postsByCategoryToRemove
                    }
                },
                lastUpdated: action.receivedAt
            }
        case FETCH_POST:
            // state.entities.posts[action.post.id] = action.post;
            //TODO: should update also the postsByCategory
            return {
                ...state,
                entities: {
                    ...state.entities,
                    posts: {
                        ...state.entities.posts,
                        [action.post.id]: action.post
                    }
                },
                // items: state.entities.posts,
                lastUpdated: action.receivedAt,
                selectedPostId: action.post.id
            }
        //TODO: check all this
        case EDIT_POST:
            _postsByCategory = state.postsByCategory;
            if (state.entities.posts[action.post.id] && state.entities.posts[action.post.id].category != action.post.category) {
                Object.keys(_postsByCategory).forEach(category => {
                    _postsByCategory[category].items.forEach((postId, index) => {
                        if (postId == action.post.id) {
                            _postsByCategory[category].items.splice(index, 1);
                        }
                    })
                });
                if (_postsByCategory[action.post.category]) {
                    if (_postsByCategory[action.post.category].items
                        && _postsByCategory[action.post.category].items.indexOf(action.post.id) === -1)
                        {
                            _postsByCategory[action.post.category].items.push(action.post.id);
                        }

                } else  {
                    _postsByCategory[action.post.category] = {
                        isFetching: false,
                        didInvalidate: false,
                        lastUpdated: Date.now(),
                        items: [ action.post.id ]
                    }
                }
            }
            return {
                ...state,
                entities: {
                    ...state.entities,
                    posts: {
                        ...state.entities.posts,
                        [action.post.id]: action.post
                    }
                },
                postsByCategory: _postsByCategory,
                // postsByCategory: {
                //     ...state.postsByCategory,
                //     [oldCategoryName]: { //removing from old
                //         ...state.postsByCategory[oldCategoryName],
                //         items: postsByOldCategory
                //     },
                //     [action.post.category]: { //adding new
                //         ...state.postsByCategory[action.post.category],
                //         items: [
                //             ...state.postsByCategory[action.post.category].items,
                //             action.post.id
                //         ]
                //     }
                // },
                lastUpdated: action.receivedAt
            }
        case FETCH_COMMENTS:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    comments: action.comments.reduce((acc, comment) => {
                        return {
                            ...acc,
                            ...{[comment.id] : comment}
                        }
                    }, state.entities.comments)
                },
                lastUpdated: action.receivedAt
            }
        case ADD_COMMENT:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    comments: {
                        ...state.entities.comments,
                        [action.comment.id]: action.comment
                    }
                },
                lastUpdated: action.receivedAt
            }
        case VOTE_COMMENT:
            let _voteScore = state.entities.comments[action.commentId].voteScore;
            _voteScore += (action.option == "upVote") ? 1 : -1;
            return {
                ...state,
                entities: {
                    ...state.entities,
                    comments: {
                        ...state.entities.comments,
                        [action.commentId]: {
                            ...state.entities.comments[action.commentId],
                            voteScore: _voteScore
                        }
                    }
                },
                lastUpdated: action.receivedAt,
            }
        case REMOVE_COMMENT:
            const commentToBeRemoved = state.entities.comments[action.comment.id];
            const newComments = JSON.parse(JSON.stringify(state.entities.comments));
            delete newComments[commentToBeRemoved.id];

            return {
                ...state,
                entities: {
                    ...state.entities,
                    comments: newComments
                },
                lastUpdated: action.receivedAt
            }

        case EDIT_COMMENT:
            return {
                ...state,
                entities: {
                    ...state.entities,
                    comments: {
                        ...state.entities.comments,
                        [action.comment.id]: action.comment
                    }
                },
                lastUpdated: action.receivedAt
            }
        case SORT_POSTS:
            const arrayPosts = objectToArray(state.entities.posts);
            const sortedPosts = sortPostsHelper(arrayPosts, action.sortedBy)
            const sortedPostsObj = arrayToObject(sortedPosts)
            return {
                ...state,
                entities: {
                    ...state.entities,
                    posts: sortedPostsObj
                }
            }
    }
    return state;
}

export default combineReducers({
    posts
})