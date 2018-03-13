// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { connect } from 'react-redux'
import { fetchPost, fetchComments } from '../../../actions/index'
import {
  PostPage, LoadingPage
} from 'components'

class PostPageContainer extends React.Component {
  state = {
    showAddComment: false,
    fetchingPost: true,
    fetchingComments: true
  }
  constructor (props) {
    super(props)

  }
  componentWillMount() {
    const postId = this.props.match.params.postId;
    this.props.fetchPost(postId).then(() => {
      this.setState({
        ...this.state,
        fetchingPost: false
      })
    });
    this.props.fetchComments(postId).then(() => {
      this.setState({
        ...this.state,
        fetchingComments: false
      })
    });

    //TODO:fetch comments for this post
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
    const comments = [];
    if (this.props.comments) {
      Object.keys(this.props.comments).forEach(commentId => {
        if (this.props.comments[commentId].parentId == postId ) {
          comments.push(this.props.comments[commentId])
        }
      });
    }

    if (!this.state.fetchingComments && !this.state.fetchingPost) {
      const post = this.props.posts[postId];
      return (
        <PostPage
          post={post}
          comments={comments}
          showAddComment={this.state.showAddComment}
          handlers={handlers}
        ></PostPage>
      )
    } else {
      return (<LoadingPage />)
    }
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts.entities.posts,
    comments: state.posts.entities.comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: (postId) => dispatch(fetchPost(postId)),
    fetchComments: (postId) => dispatch(fetchComments(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPageContainer)