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
    console.log("component will mount");
    const postId = this.props.match.params.postId;
    this.props.fetchPost(postId).then((post) => {
      if (!this.props.posts || !this.props.posts[postId]) {
        console.log("should redirect to 404 page");
        this.props.history.push(`/404`);
      }
      this.setState({
        ...this.state,
        fetchingPost: false
      })
    });
    this.props.fetchComments(postId).then(() => {
      console.log("Fetched comments for postId: ", postId);
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

    const commentsForPost = {}
    const post = this.props.posts[postId];
    const {comments} = this.props;

    Object.keys(comments).forEach(function(commentId) {
      if (comments[commentId].parentId == post.id) {
        commentsForPost[commentId] = comments[commentId];
      }
    });

    if (!this.state.fetchingComments && !this.state.fetchingPost) {
      return (
        <PostPage
          post={post}
          comments={commentsForPost}
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