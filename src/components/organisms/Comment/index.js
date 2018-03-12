import React from 'react'
import { Link} from 'react-router-dom'
import { ConfirmModal } from 'components'

const Comment = ({comment, handlers, layout}) => {
  const title = "Do you want to delete this comment?";
  const body = "This action can't be undone.";
  const primaryButtonText = "Delete";
  const secondaryButtonText = "Cancel";
  const showEditComment = (comment && comment.id) ? true : false;
  return (
    <div>
      <button onClick={() => handlers.voteComment(comment.id, "upVote")}>upVote</button>
      <button onClick={() => handlers.voteComment(comment.id, "downVote")}>downVote</button>
      <div>Comment: {comment.body}</div>
      <div>Author: {comment.author}</div>
      <div>Vote Score: {comment.voteScore}</div>
      {/* <div>timestamp: {DateUtils.parseDatetime(comment.timestamp)}</div> */}
      <div>timestamp: {comment.timestamp}</div>
      <hr/>
      {/* <button onClick={() => history.push(`/comment/edit/${comment.id}`)}>Edit</button> */}
      <button onClick={() => handlers.enableEditionMode()}>Edit</button>
      <ConfirmModal
        title = {title}
        body = {body}
        primaryButtonText = {primaryButtonText}
        secondaryButtonText = {secondaryButtonText}
        onPrimaryAction={handlers.removeComment}
        />
    </div>
  )
}

export default Comment
