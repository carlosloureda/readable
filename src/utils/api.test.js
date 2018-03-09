import {
    fetchAllPosts,
    getPostApi,
    votePostApi,
    fetchAllCategories,
    fetchPostInCategory,
    addPostApi,
    deletePost,
    updatePost,
    getPostCommentsApi,
    addCommentApi,
    getCommentApi,
    voteCommentApi,
    updateComment,
    deleteComment
} from './api.js';

const categories = [
    'react', 'redux', 'udacity'
]

const posts = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        commentCount: 2
    },
    "6ni6ok3ym7mf1p33lnez": {
        id: '6ni6ok3ym7mf1p33lnez',
        timestamp: 1468479767190,
        title: 'Learn Redux in 10 minutes!',
        body: 'Just kidding. It takes more than 10 minutes to learn technology.',
        author: 'thingone',
        category: 'redux',
        voteScore: -5,
        deleted: false,
        commentCount: 0
    }
}

const newPost = {
    id: '5nigok5pf7mf1pl4id03',
    timestamp: 1468479767605,
    title: 'Learn Redux in 2 months!',
    body: 'A sample body.',
    author: 'thingthree',
    category: 'redux',
    voteScore: 1,
    deleted: false,
    commentCount: 0
}

const newComment = {
    id: '6tp4bspn605n6pn408ei1',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
}

const comments = {
    "894tuq4ut84ut8v4t8wun89g": {
        id: '894tuq4ut84ut8v4t8wun89g',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1468166872634,
        body: 'Hi there! I am a COMMENT.',
        author: 'thingtwo',
        voteScore: 6,
        deleted: false,
        parentDeleted: false
    },
    "8tu4bsun805n8un48ve89": {
        id: '8tu4bsun805n8un48ve89',
        parentId: "8xf0y6ziyjabvozdd253nd",
        timestamp: 1469479767190,
        body: 'Comments. Are. Cool.',
        author: 'thingone',
        voteScore: -5,
        deleted: false,
        parentDeleted: false
    }
}

test('fetch all posts Test', () => {
    return fetchAllPosts().then(posts => {
        expect(posts.length).toBeGreaterThan(0);
    });
});

test('get a post Test', () => {
    const postId = "8xf0y6ziyjabvozdd253nd"
    return getPostApi(postId).then(post => {
        expect(post.id).toBe(postId);
    });
});

test('upVoting Post Test', () => {
    const postId = "8xf0y6ziyjabvozdd253nd"
    const option = "upVote";
    return votePostApi(postId, option).then(post => {
        expect(post.voteScore).toBe(7);
    });
});

test('downVoting Post Test', () => {
    const postId = "8xf0y6ziyjabvozdd253nd"
    const option = "downVote";
    return votePostApi(postId, option).then(post => {
        expect(post.voteScore).toBe(6);
    });
});

test('fetch all categories Test', () => {
    return fetchAllCategories().then(categories => {
        const categoriesNames = categories.map(cat => cat.name);
        categoriesNames.forEach(category => {
            expect(categoriesNames.indexOf(category)).toBeGreaterThan(-1)
        });
        expect(categoriesNames.length).toBe(3);
    });
});

test('fetch post by category Test', () => {
    return fetchPostInCategory('redux').then(posts => {
        expect(posts.length).toBeGreaterThan(0);
        expect(posts[0].id).toBe("6ni6ok3ym7mf1p33lnez");
    });
});

test('add post Test', () => {
    return addPostApi(newPost).then(post => {
        expect(post.id).toBe(newPost.id);
    });
});

test('delete post Test', () => {
    return deletePost(newPost.id).then(post => {
        expect(post.deleted).toBe(true);
    });
});

test('update post Test', () => {
    return updatePost(newPost.id, {'author': 'authorEdited'}).then(post => {
        expect(post.author).toBe('authorEdited');
    });
});

test('get post comments Test', () => {
    const postId = "8xf0y6ziyjabvozdd253nd";
    return getPostCommentsApi(postId).then(comments => {
        expect(comments.length).toBe(2);
    });
});

//TODO:
test('add comment to post Test', () => {
    return addCommentApi(newComment).then(comment => {
        // console.log("add comment: ", comment);
        // expect(comment.id).toBe(newComment.id);
    });
});

test('get comment Test', () => {
    return getCommentApi(newComment.id).then(comment => {
        expect(comment.id).toBe(newComment.id);
    });
});

test('vote comment Test', () => {
    const commentId = "894tuq4ut84ut8v4t8wun89g";
    const option = "upVote";
    return voteCommentApi(commentId, option).then(comment => {
        expect(comment.voteScore).toBe(7);
    });
});

test('update comment Test', () => {
    return updateComment(newComment.id, {author: 'author updated'}).then(comment => {
        expect(comment.author).toBe('author updated');
    });
});

test('delete comment Test', () => {
    return deleteComment(newComment.id).then(comment => {
        expect(comment.deleted).toBe(true);
    });
});
