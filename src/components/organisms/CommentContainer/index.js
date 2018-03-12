import React from 'react'
import { Comment } from 'components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { voteComment, removeComment } from '../../../actions/index'
import { CommentFormContainer } from 'components'

class CommentContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      //TODO: this lets to multiedit and we shouldn't
      editComment: false
    }
  }

  removeComment = () => {
    console.log("delete comment");
    this.props.removeComment(this.props.comment.id).then((callback) => {
      // callback(); // closing the modal
    });
  }

  enableEditionMode = () => {
    console.log("enabled edition mode");
    this.setState({
      ...this.state,
      editComment: true
    })
  }

  cancelEditionMode = () => {
    console.log("disabled edition mode");
    this.setState({
      ...this.state,
      editComment: false
    })
  }

  render() {
    const handlers = {
      voteComment: this.props.voteComment,
      removeComment: this.removeComment,
      enableEditionMode: this.enableEditionMode
    }
    if (this.state.editComment) {
      return (
        <CommentFormContainer
          comment={this.props.comment}
          parentId={this.props.comment.parentId}
          addCommentCallback={handlers.onToggleCommentForm}
          onCancelEdition={this.cancelEditionMode}
        ></CommentFormContainer>
      )
    } else {
      return (
        <Comment
          comment={this.props.comment}
          handlers={handlers}
        ></Comment>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    voteComment: (commentId, option) => dispatch(voteComment(commentId, option)),
    removeComment: (commentId) => dispatch(removeComment(commentId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer)
