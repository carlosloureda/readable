import React from 'react'
import { CommentContainer } from 'components'

const mockedComments = [
   {
     id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
]
const CommentsList = ({postId}) => {
  const comments = mockedComments
  return (
    (mockedComments && mockedComments.map(comment =>
      {
        return <CommentContainer key={comment.id} comment={comment}>
        </CommentContainer>
      }
    )
  ))
}

export default CommentsList
