// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { connect } from 'react-redux'

import { fetchPost } from '../../../actions/index'

import {
  PostPage
} from 'components'

class PostPageContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showAddComment: false,
      loading: true
    }
  }
  componentWillMount() {
    const postId = this.props.match.params.postId;
    this.props.fetchPost(postId).then(() => {
      this.setState({
        ...this.state,
        loading: false
      })
    });
  }

  onToggleCommentForm = () => {
    this.setState({
      showAddComment: ! this.state.showAddComment
    });
  }

  render() {
    const postId = this.props.match.params.postId;
    const handlers = {
      onToggleCommentForm: this.onToggleCommentForm
    }
    if (this.state.loading) {
      return (<p>loading in post page container</p>)
    } else {
      const post = this.props.posts[postId];
      return (
        <PostPage
          post={post}
          showAddComment={this.state.showAddComment}
          handlers={handlers}
        ></PostPage>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.entities.posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: (postId) => dispatch(fetchPost(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPageContainer)