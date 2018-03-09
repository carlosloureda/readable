import { combineReducers } from 'redux';
import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    VOTE_POST,
    REQUEST_CATEGORIES,
    SET_SELECTED_CATEGORY
} from '../actions/index'

const defaultPostState = {
    selectedCategory: null,
    selectedPostId: null,
    entities: {
        posts:{
            '8xf0y6ziyjabvozdd253nd': {
                id: '8xf0y6ziyjabvozdd253nd',
                timestamp: 1467166872634,
                title: '###Udacity is the best place to learn React',
                body: 'Everyone says so after all.',
                author: 'thingtwo',
                category: 'react',
                voteScore: 6,
                deleted: false,
                commentCount: 2
            },
            '6ni6ok3ym7mf1p33lnez': {
                id: '6ni6ok3ym7mf1p33lnez',
                timestamp: 1468479767190,
                title: '###Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
                category: 'redux',
                voteScore: -5,
                deleted: false,
                commentCount: 0
            }
        }
    },
    postsByCategory:  {
        redux: {
            isFetching: false,
            didInvalidate: false,
            items: ["6ni6ok3ym7mf1p33lnez"]
        },
        react: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: 1439478405547,
            items: [ "8xf0y6ziyjabvozdd253nd" ]
        },
        udacity: {
            isFetching: false,
            didInvalidate: false,
            lastUpdated: 1439478405547,
            items: [ ]
        }
    },
    categories: [
        { name: "react", path: "react" },
        { name: "redux", path: "redux" },
        { name: "udacity", path: "udacity" }
    ],
    //This should go elsewhere
    isFetching: false,
    didInvalidate: false,
    lastUpdated: Date.now(),
    selectedPostId: null
}

function posts(state = defaultPostState, action) {
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

            let newState = {
                ...state,
                isFetching: false,
                didInvalidate: false,
                entities: {
                    posts:  _posts
                },
                postsByCategory: action.items.reduce((acc, item) => {
                    return {
                        ...acc,
                        [item.category]: {
                            ...acc[item.category],
                            items: [
                                item.id
                            ]
                        }
                    }
                }, state.postsByCategory),
                lastUpdated: action.receivedAt,
                selectedCategory: (action.category) ? action.category : null,
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
    }

    return state;
}

export default combineReducers({
    posts
})