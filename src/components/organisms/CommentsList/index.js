import React from 'react'
import { CommentContainer } from 'components'

const CommentsList = ({comments}) => {
  return (
    (comments && comments.map(comment =>
      {
        return <CommentContainer key={comment.id} comment={comment}>
        </CommentContainer>
      }
    )
  ))
}

export default CommentsList
