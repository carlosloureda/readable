import React from 'react'
import { CommentContainer } from 'components'
import List from 'material-ui/List';

const CommentsList = ({comments}) => {
  return (
    <List>
      {comments && comments.map(comment =>
        {
          return (<CommentContainer key={comment.id} comment={comment}>
          </CommentContainer>)
        }
      )}
    </List>
  )
}

export default CommentsList
