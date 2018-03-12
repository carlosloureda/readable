import React from 'react'

const CommentForm = ({comment, handlers}) => {
    const editMode = (comment && comment.body) ? true : false;
    return (
        <div>
            <h1>{editMode ? 'Edit Comment' : 'Add Comment'}</h1>
            <div>
                <label htmlFor="author">Author</label>
                <input
                    name="author"
                    value={comment.author}
                    onChange={ handlers.handleChange }
                />
            </div>
            <div>
                <label>Comment</label>
                <input
                    name="body"
                    value={comment.body}
                    onChange={ handlers.handleChange }
                />
            </div>
            <div>
                {!editMode &&
                    <button onClick={handlers.addComment}>Save comment</button>
                }
                {editMode &&
                    <div>
                        <button onClick={handlers.editComment}>Edit comment</button>
                        <button onClick={handlers.onCancelEdition}>Cancel</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CommentForm