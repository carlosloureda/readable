import React, { Component } from 'react'
import { PostsSortSelector } from 'components'
import { connect } from 'react-redux'

import {
  sortPosts
} from '../../../actions/index'

class PostsSortSelectorContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      sortedBy: 'date_desc',
    }
  }

  onSortingSelection = (event) => {
    this.setState({
      sortedBy: event.target.value
    }, () =>{
      this.props.sortPosts(this.props.posts, this.state.sortedBy);
    })
  }

  render() {
    const sortOptions = [
      {slug: 'date_desc', name: 'Newest'},
      {slug: 'date_asc', name: 'Oldest'},
      {slug: 'score_desc', name: 'up voted'},
      {slug: 'score_asc', name: 'down voted'},
    ]
    return (
      <PostsSortSelector
        classes={this.props.classes}
        sortedBy={this.state.sortedBy}
        sortOptions={sortOptions}
        onSortingSelection={this.onSortingSelection}
      ></PostsSortSelector>
    )
  }
}

function mapStateToProps(state) {
  return {
      posts: state.posts.entities.posts,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    sortPosts: (data, sortedBy) => dispatch(sortPosts(data, sortedBy)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsSortSelectorContainer)