import React from 'react'
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';

const CommentForm = ({comment, handlers}) => {
    const editMode = (comment && comment.body) ? true : false;
    return (
        <div>
            <h1>{editMode ? 'Edit Comment' : 'Add Comment'}</h1>
            <div>
                <div>
                    <FormControl>
                        <InputLabel htmlFor="author">Author</InputLabel>
                        <Input name="author" value={comment.author} onChange={handlers.handleChange} />
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <InputLabel htmlFor="body">Comment</InputLabel>
                        <Input
                            name="body" value={comment.body}
                            multiline={true}
                            rows={2}
                            rowsMax={4}
                            onChange={handlers.handleChange}
                        />
                    </FormControl>
                </div>
            </div>
            <div>
                {!editMode &&
                    <Button onClick={handlers.addComment} color="primary">
                        Save comment
                    </Button>
                }
                {editMode &&
                    <div>
                        <Button onClick={handlers.onCancelEdition} color="secondary">
                            Cancel
                        </Button>
                        {/* <Button onClick={handlers.editComment} variant="raised" color="primary"> */}
                        <Button onClick={handlers.editComment} color="primary">
                            Save comment
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CommentForm