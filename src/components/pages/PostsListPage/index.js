// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import {
  PageTemplate, Header, Footer,
  PostSortSelector, CategoryFetcherContainer, AddPostButton,
  PostList
} from 'components'
import { withRouter } from 'react-router-dom'

const Hero = withRouter(({posts, history}) => {
  return (
    <div>
      <h1>PostsListPage</h1>
      <PostSortSelector></PostSortSelector>
      {/* TODO: Maybe best approach is to fetch categories in CategoryFetcherContainer */}
      <CategoryFetcherContainer></CategoryFetcherContainer>
      <PostList posts={ posts }></PostList>
      {/* TODO: should we pass the event handler here or have it inside? */}
      <AddPostButton icon={'add'} clickHandler={() => history.push('/post/new')}>
      </AddPostButton>
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


{/* <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}