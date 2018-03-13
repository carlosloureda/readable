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


const Hero = withRouter(({posts, history}) => {
  return (
    <div>
      {/* <h1>PostsListPage</h1> */}
      <PostsSortSelectorContainer></PostsSortSelectorContainer>
      {/* TODO: Maybe best approach is to fetch categories in CategoryFetcherContainer */}
      <CategoryFetcherContainer></CategoryFetcherContainer>
      <PostList posts={ posts }></PostList>
      {/* TODO: should we pass the event handler here or have it inside? */}
      <IconButton
        onClick={() => history.push('/post/new')}
        aria-label="add-post">
        <AddCircleIcon />
      </IconButton>
    </div>
  )
})

/**
 * Main page for all posts and posts by categories
 */
const PostsListPage = ({posts, categories}) => {
  return (
    <PageTemplate
      header={<Header />}
      hero={<Hero posts={posts}/>}
      footer={<Footer />}
      >

      {/* <FeatureList /> */}
    </PageTemplate>
  )
}

export default PostsListPage
