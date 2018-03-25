// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'
import { connect } from 'react-redux'
import {
  fetchPosts
} from '../../../actions/index'

import {
  PostsListPage, LoadingPage
} from 'components'
// https://material-ui-next.com/customization/css-in-js/
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';
const styles = {
  justifyRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    minHeight: 80,
    flex: 1,
    marginRight: 50,
  },
  container: {
    display: 'flex',
    flexDirection: 'row wrap',
    padding: 20,
    width: '100%'
  },
  sortSelector: {
    paddingRight: '50px',
  },
  sortSelectorLabel: {
    fontSize: '1.5em'
  },
  sortSelectorInput: {
    fontSize: '2.0em'
  }
};
class PostsListPageContainer extends React.Component {
  constructor(props) {
    super(props)
    // this.onSortChange = this.onSortChange.bind(this)
    this.state = {
      loading: true
    }
  }
  componentWillMount() {
    const { posts } = this.props;
    const category = this.props.match.params.category;
    this.props.fetchPosts(category, 'date_desc').then(() => {
        this.setState({
          loading: false
        })
    });
    //TODO: select category in state ...
  }
  render() {
    let posts = this.props.posts;
    const category = this.props.match.params.category;
    if (category) {
      posts = this.props.postsByCategory[category] && this.props.postsByCategory[category].items.map(postId =>
        this.props.posts[postId]
      )
    }
    if (this.state.loading) {
      return (<LoadingPage/>)
    }
    else {
      return (
        <PostsListPage
          posts={posts}
          classes={this.props.classes}
        ></PostsListPage>
      )
    }
  }
}

function mapStateToProps(state) {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(
  withStyles(styles)(PostsListPageContainer)))