// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import {
  PageTemplate, Header, Footer,
  PostsSortSelectorContainer, CategoryFetcherContainer,
  PostList
} from 'components'
import { withRouter } from 'react-router-dom'
import IconButton from 'material-ui/IconButton';
import AddCircleIcon from 'material-ui-icons/AddCircle';


const Hero = withRouter(({posts, classes, history}) => {
  return (
    <div>
      <div className={classes.container}>
        <PostsSortSelectorContainer classes={classes}></PostsSortSelectorContainer>
        <CategoryFetcherContainer classes={classes}></CategoryFetcherContainer>
        <div
            className={classes.justifyRight}
        >
          <IconButton
            onClick={() => history.push('/post/new')}
            aria-label="add-post">
            <AddCircleIcon color="primary" style={{ fontSize: 80 }} />
          </IconButton>
        </div>
      </div>
      <PostList posts={ posts }></PostList>
    </div>
  )
})

/**
 * Main page for all posts and posts by categories
 */

const PostsListPage = ({posts, classes, categories}) => {
  console.log("This classes: ", classes);
  return (
    <PageTemplate
      header={<Header />}
      hero={<Hero posts={posts} classes={classes}/>}
      footer={<Footer />}
      >
    </PageTemplate>
  )
}

export default PostsListPage;