import React, { Component } from 'react'
import { CategoryFetcher } from 'components'
import { connect } from 'react-redux'
import {
  requestCategories, fetchPosts
} from '../../../actions/index'
import { withRouter } from 'react-router-dom'

class CategoryFetcherContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedCategory: this.props.selectedCategory
    }
  }

  componentDidMount() {
    this.props.requestCategories().then(() => {
      // console.log("fetching CATEGORIES finished: ", this.props.categories)
    });
  }

  onCategorySelected = (event) => {
    let category = event.target.value;
    this.props.fetchPosts(category, 'date_desc').then(() => {
      this.setState({
        ...this.state,
        selectedCategory: category
      })
    });

    let path = event.target.value != 'all'? `/category/${event.target.value}`  : '/';
    this.props.history.push(path)
  }

  render() {
    return (
      <CategoryFetcher
        categories = {this.props.categories}
        selectedCategory = {this.state.selectedCategory}
        onCategorySelected = {this.onCategorySelected}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
      categories: state.posts.categories,
      selectedCategory: state.posts.selectedCategory,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    requestCategories: () => dispatch(requestCategories()),
    fetchPosts: (data, sortedBy) => dispatch(fetchPosts(data, sortedBy))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryFetcherContainer))