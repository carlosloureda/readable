import React from 'react'
import { CommentContainer } from 'components'
import List from 'material-ui/List';

const CommentsList = ({comments}) => {
  return (
    <List>
      {Object.keys(comments).map(commentId =>
        <CommentContainer
          key={commentId}
          comment={comments[commentId]}>
        </CommentContainer>
      )}
    </List>
  )
}

export default CommentsList
