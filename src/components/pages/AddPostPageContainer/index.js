// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import { AddPostPage } from 'components'
import { connect } from 'react-redux'
import { requestCategories, addPost, fetchPost, editPost } from '../../../actions/index'
import { withRouter } from 'react-router-dom'
import { getUUIC } from '../../../utils/api'

class AddPostPageContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      post: {
        id: '',
        timestamp: '',
        title: '',
        body: '',
        author: '',
        category: ''
      },
      validation: {
        body: false,
        author: false,
        title: false
      }
    }
  }


  componentWillMount() {
    this.props.requestCategories().then(() => {
        this.setState({
          post: {
            ...this.state.post,
            category: this.props.categories[0].name
          }
        });
    });

    if (this.props.match && this.props.match.params.postId) {
      const postId = this.props.match.params.postId;
      this.props.fetchPost(postId).then(() => {
        const post = this.props.posts[postId];
        this.setState({
          ...this.state,
          post:  {
            id: post.id,
            timestamp: post.timestamp,
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category
          }
        })
      });
    }
  }

  handleChange = (event) => {
    const target = event.target;
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [target.name]: target.value
      },
      validation: {
        ...this.state.validation,
        [target.name]: target.value == ''
      }
    });
  }

  onAddPost = () => {
    const post = {
      id: getUUIC(),
      title: this.state.post.title,
      body: this.state.post.body,
      author: this.state.post.author,
      category: this.state.post.category,
      timestamp: Date.now()
    }
    if (! this.validateForm() ) {
      return;
    }
    this.props.addPost(post).then(() =>  {
      this.props.history.push(`/${this.state.post.category}/${post.id}`);
    });
  }

  validateForm = () => {
    if (this.state.post.title != "" && this.state.post.body != ""
        && this.state.post.author != ""
    ) {
      return true;
    } else {
      this.setState({
        ...this.state,
        validation: {
          title: this.state.post.title == "",
          author: this.state.post.author == "",
          body: this.state.post.body == ""
        }
      })
      return false;
    }
  }

  onEditPost = () => {
    const params = {
      title: this.state.post.title,
      body: this.state.post.body,
      author: this.state.post.author,
      category: this.state.post.category
    }
    if (! this.validateForm()) {
      return;
    }
    this.props.editPost(this.state.post.id, params).then(() =>  {
      this.props.history.push(`/${this.state.post.category}/${this.state.post.id}`);
    });
  }

  render() {
    const handlers = {
      handleChange: this.handleChange,
      onAddPost: this.onAddPost,
      onEditPost: this.onEditPost
    }
    return (
      <AddPostPage
        post = {this.state.post}
        validation = {this.state.validation}
        categories = {this.props.categories}
        handlers = {handlers}
      ></AddPostPage>
    )
  }
}

function mapStateToProps(state) {
  return {
      categories: state.posts.categories,
      posts: state.posts.entities.posts
  };
}

function mapDispatchToProps (dispatch) {
  return {
    requestCategories: (data, sortedBy) => dispatch(requestCategories()),
    addPost: (post) => dispatch(addPost(post)),
    editPost: (postId, params) => dispatch(editPost(postId, params)),
    fetchPost: (postId) => dispatch(fetchPost(postId)),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddPostPageContainer)
)