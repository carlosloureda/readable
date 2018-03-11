import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { ConfirmModal } from 'components'

const deleteModal = () => {
    console.log("deleteModal clicked");
}

const Post = withRouter(({post, layout, handlers, history}) => {
    console.log("layout is: ", layout);
    console.log("handlers: ", handlers);

    const title = "Do you want to delete this post?";
    const body = "This action can't be undone. Deleting a post also deletes its comments";
    const primaryButtonText = "Delete";
    const secondaryButtonText = "Cancel";
    //TODO: Think on how we can put this on a constat and export it
    if (layout && layout == "LIST_ITEM") {
        return (<li key={post.id}>
            <hr/>
            {/* <button onClick={() => votePost(post.id, "upVote")}>upVote</button> */}
            <button onClick={() => handlers.votePost(post.id, "upVote")}>upVote</button>
            {/* <button onClick={() => {}}>upVote</button> */}
            <button onClick={() => handlers.votePost(post.id, "downVote")}>downVote</button>
            <div><Link to={`/post/${post.id}`}>Title: {post.title}</Link></div>
            <div>Autor: {post.author}</div>
            <div>Category: {post.category}</div>
            <div>Vote Score: {post.voteScore}</div>
            <div>Coments count: {post.commentCount}</div>
            {/* <div>timestamp: {DateUtils.parseDatetime(post.timestamp)}</div> */}
            <div>timestamp: post.timestamp</div>
            <hr/>
            {/* TODO: Maybe we can use names instead of the url */}
            <button onClick={() => history.push(`/post/edit/${post.id}`)}>Edit</button>
            <ConfirmModal
                title = {title}
                body = {body}
                primaryButtonText = {primaryButtonText}
                secondaryButtonText = {secondaryButtonText}
                onPrimaryAction={handlers.removePost}
            />
        </li>)
    }
    return (
        <div>
            <button onClick={() => handlers.votePost(post.id, "upVote")}>upVote</button>
            <button onClick={() => handlers.votePost(post.id, "downVote")}>downVote</button>
            <div>Title: {post.title}</div>
            <div>Body: {post.body}</div>
            <div>Autor: {post.author}</div>
            <div>Category: {post.category}</div>
            <div>Vote Score: {post.voteScore}</div>
            <div>Coments count: {post.commentCount}</div>
            {/* <div>timestamp: {DateUtils.parseDatetime(post.timestamp)}</div> */}
            <div>timestamp: post.timestamp</div>
            <hr/>
            {/* TODO: Maybe we can use names instead of the url */}
            <button onClick={() => history.push(`/post/edit/${post.id}`)}>Edit</button>
            <ConfirmModal
                title = {title}
                body = {body}
                primaryButtonText = {primaryButtonText}
                secondaryButtonText = {secondaryButtonText}
                onPrimaryAction={handlers.removePost}
            />
        </div>
    )
})


export default Post
