import React, { Component } from 'react'
import { CategoryFetcher } from 'components'
import { connect } from 'react-redux'
import {
  requestCategories
} from '../../../actions/index'
import { withRouter } from 'react-router-dom'

class CategoryFetcherContainer extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedCategory: 'all'
    }
  }

  componentDidMount() {
    console.log("???? props: ", this.props);
    this.props.requestCategories().then(() => {
      console.log("fetching CATEGORIES finished: ", this.props.categories)
    });
  }

  onCategorySelected = (event) => {
    this.setState({
      ...this.state,
      selectedCategory: event.target.value
    })
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
      // selectedCategory: state.posts.selectedCategory,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    requestCategories: () => dispatch(requestCategories())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryFetcherContainer))