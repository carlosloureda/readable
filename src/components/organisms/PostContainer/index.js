import React from 'react'
import { Post } from 'components'
import { votePost, removePost, fetchPost, fetchPosts } from '../../../actions/index'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row wrap',
    // padding: 20,
    width: '100%'
  },
  justifyRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    minHeight: 80,
    flex: 1,
    marginRight: 50,
  },
  upVotePostWrapper: {
    borderRadius: '100%',
    width: 120,
    height: 120,
    // backgroundColor: 'grey',
    textAlign: 'center'
  },
  postTitle: {
    fontSize: '2em'
  },
  postHeaderVoteButtons: {
    flexGrow: 1
  },
  postHeaderTitle: {
    flexGrow: 4,
    justifyContent: 'space-between ',
    display: 'flex',
    flexDirection:'column'
  },
  categoryText: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '0.875rem',
    fontWeight: 400,
    fontFamily: ["Roboto", "Helvetica", "Arial", 'sans-serif'],
    lineHeight: '1.46429em'
  }
};

class PostContainer extends React.Component {

  constructor (props) {
    super(props)
  }

  removePost = (callback) => {
    console.log("On remove post");
    this.props.removePost(this.props.post.id).then(() => {
      callback(); // closing the modal
    });
    this.props.history.push(`/`);
  }

  render() {
    const handlers = {
      votePost: this.props.votePost,
      removePost: this.removePost,
    }
    return (
      <Post
        classes={this.props.classes}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(
  withStyles(styles)(PostContainer)))