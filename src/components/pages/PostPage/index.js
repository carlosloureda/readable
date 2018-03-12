// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import {
  PageTemplate, Header, Footer,
  PostSortSelector, CategoryFetcher, AddPostButton,
  PostList, PostContainer, CommentsList, CommentForm
} from 'components'

const Hero = ({post, layout, comments, showAddComment, handlers}) => {
  console.log("on HERO, handlers: ", handlers);
  return (
    <div>
      <h1>PostPage</h1>
      {/* Post data */}
      <PostContainer
          key={post.id}
          post={post}
          layout={layout}
          handlers={handlers}
      ></PostContainer>

      {/* Add coment */}
      {
        !showAddComment ?
        <button onClick={handlers.onToggleCommentForm}>Add comment</button>
        :
        <div>
            <button onClick={handlers.onToggleCommentForm}>Cancel</button>
            <button onClick={()=>{}}>Save comment</button>
          </div>
      }
      {showAddComment ? <CommentForm></CommentForm>: null}

      {/* Comments */}
      <CommentsList
        comments={comments}
      ></CommentsList>
    </div>
  )
}

const PostPage = ({post, layout, comments, showAddComment, handlers}) => {
  return (
    <PageTemplate
      header={<Header />}
      hero={
        <Hero
          post={post}
          layout={layout}
          comments={comments}
          showAddComment={showAddComment}
          handlers={handlers}
        />
      }
      footer={<Footer />}
      >
    </PageTemplate>
  )
}

export default PostPage