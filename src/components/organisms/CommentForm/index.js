import React from 'react'

const CommentForm = ({comment}) => {
    return (
        <div>
            <h1>Add Comment</h1>
            <div>
                <label htmlFor="author">Author</label>
                <input
                    name="author"
                    // value={comment.author}
                    // onChange={ handlers.handleChange }
                />
            </div>
            <div>
                <label>Comment</label>
                <input
                    name="comment"
                    // value={comment.body}
                    // onChange={ handlers.handleChange }
                />
            </div>
        </div>
    )
}

export default CommentForm