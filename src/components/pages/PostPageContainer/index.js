// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import {
  PostPage
} from 'components'

const mockedPosts = {
  '8xf0y6ziyjabvozdd253nd':  {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  '6ni6ok3ym7mf1p33lnez':  {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  }
}

class PostPageContainer extends React.Component {

  constructor (props) {
    super(props)

    console.log("props: ", props);
    this.state = {
      showAddComment: false
    }
  }
  onToggleCommentForm = () => {
    this.setState({
      showAddComment: ! this.state.showAddComment
    });
  }

  render() {
    const post = mockedPosts[this.props.match.params.postId]
    const handlers = {
      onToggleCommentForm: this.onToggleCommentForm
    }
    return (
      <PostPage
        post={post}
        showAddComment={this.state.showAddComment}
        handlers={handlers}
      ></PostPage>
    )

  }
}

export default PostPageContainer