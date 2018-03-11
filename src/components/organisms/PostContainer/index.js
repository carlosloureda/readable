import React from 'react'
import { Post } from 'components'
import { votePost, removePost, fetchPost, fetchPosts } from '../../../actions/index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class PostContainer extends React.Component {

  constructor (props) {
    super(props)
  }

  removePost = (callback) => {
    this.props.removePost(this.props.post.id).then(() => {
      callback(); // closing the modal
      this.props.history.push(`/`);
    });
  }

  render() {
    const handlers = {
      votePost: this.props.votePost,
      removePost: this.removePost
    }
    return (
      <Post
        post={this.props.post}
        layout={this.props.layout}
        handlers={handlers}
      ></Post>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    votePost: (postId, option) => dispatch(votePost(postId, option)),
    removePost: (postId) => dispatch(removePost(postId)),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PostContainer)
)