import React from 'react'
import { Post } from 'components'

class PostContainer extends React.Component {

  constructor (props) {
    super(props)
  }

  votePost = (postId, option) => {
    if(option === 'upVote') {
      console.log("up vote post");
    } else if(option === 'downVote') {
      console.log("down vote post");
    }
  }

  removePost = () => {
    console.log("delete post");
  }

  render() {
    const handlers = {
      votePost: this.votePost,
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

export default PostContainer
