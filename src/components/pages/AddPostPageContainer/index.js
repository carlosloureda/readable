// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import { AddPostPage } from 'components'

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

class PostsListPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      post: {
        id: '',
        timestamp: '',
        title: '',
        body: '',
        author: '',
        category: 'react' //TODO: Add a proper default
      }
    }
    const post = mockedPosts[this.props.match.params.postId];
    if (post) {
      this.state = {
        post: {
          id: post.id,
          timestamp: post.timestamp,
          title: post.title,
          body: post.body,
          author: post.author,
          category: post.category
        }
      }
    }
    console.log("state: ", this.state);
  }

  handleChange = (event) => {
    const target = event.target;
    // const value = target.type === 'select-one' ? target.checked : target.value;
    this.setState({
      post: {
        ...this.state.post,
        [target.name]: target.value
      }
    });
  }

  render() {
    const handlers = {
      handleChange: this.handleChange
    }
    return (
      <AddPostPage
        post = {this.state.post}
        handlers = {handlers}
      ></AddPostPage>
    )
  }
}

export default PostsListPage
