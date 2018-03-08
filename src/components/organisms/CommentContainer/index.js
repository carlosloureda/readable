import React from 'react'
import { Comment } from 'components'
import { Link } from 'react-router-dom'

class CommentContainer extends React.Component {

  constructor (props) {
    super(props)
  }

  voteComment = (postId, option) => {
    if(option === 'upVote') {
      console.log("up vote comment");
    } else if(option === 'downVote') {
      console.log("down vote comment");
    }
  }

  removeComment = () => {
    console.log("delete comment");
  }

  render() {
    const handlers = {
      voteComment: this.voteComment,
      removeComment: this.removeComment
    }
    return (
      <Comment
        comment={this.props.comment}
        // layout={this.props.layout}
        handlers={handlers}
      ></Comment>
    )
  }
}

export default CommentContainer
