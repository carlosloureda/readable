// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { connect } from 'react-redux'
import {
  fetchPosts
} from '../../../actions/index'

import {
  PostsListPage
} from 'components'

class PostsListPageContainer extends React.Component {
  constructor(props) {
    super(props)
    // this.onSortChange = this.onSortChange.bind(this)
  }
  componentDidMount() {
    const { posts } = this.props;
    console.log("props: ", this.props);
    const category = this.props.match.params.category;
    this.props.fetchPosts(category, 'date').then(() => {
        console.log("fetching posts finished: ", this.props.posts)
    });
    //TODO: select category in state ...
  }
  render() {
    let posts = this.props.posts;
    const category = this.props.match.params.category;
    if (category) {
      posts = this.props.postsByCategory[category].items.map(postId =>
        this.props.posts[postId]
      )
    }
    return (
      <PostsListPage
        posts={posts}
      ></PostsListPage>
    )
  }
}

function mapStateToProps(state) {
  console.log("STATE: ", state);
  return {
      posts: state.posts.entities.posts,
      postsByCategory: state.posts.postsByCategory,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (data, sortedBy) => dispatch(fetchPosts(data, sortedBy)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsListPageContainer)