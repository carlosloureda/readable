import React, { Component } from 'react'
import { PostsSortSelector } from 'components'
import { connect } from 'react-redux'

import {
  sortPosts
} from '../../../actions/index'

class PostsSortSelectorContainer extends Component {
  // date , score, desc, asc
  constructor(props){
    super(props)
    // date_desc, date_asc
    // score_desc, score_asc

    this.state = {
      sortedBy: 'date_desc',
      // sortOrder: 'desc'
    }
  }

  onSortingSelection = (event) => {
    this.setState({
      // ...this.state,
      sortedBy: event.target.value
    }, () =>{
      //TODO: the sorted by shoule be saved on the redux
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