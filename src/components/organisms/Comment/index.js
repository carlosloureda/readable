import React from 'react'
import { Link} from 'react-router-dom'

const Comment = ({comment, handlers, layout}) => {

  //TODO: if deleted ... or parentDeleted
  return (
    <div>
          <hr/>
      <button onClick={() => handlers.voteComment(comment.id, "upVote")}>upVote</button>
      <button onClick={() => handlers.voteComment(comment.id, "downVote")}>downVote</button>
      <div>Comment: {comment.body}</div>
      <div>Author: {comment.author}</div>
      <div>Vote Score: {comment.voteScore}</div>
      {/* <div>timestamp: {DateUtils.parseDatetime(comment.timestamp)}</div> */}
      <div>timestamp: comment.timestamp</div>
      <hr/>
      {/* <button onClick={() => history.push(`/comment/edit/${comment.id}`)}>Edit</button> */}
      <button onClick={() => {}}>Edit</button>
      <button onClick={() => handlers.removeComment(comment.id)}>Delete</button>
    </div>
  )
}

export default Comment
