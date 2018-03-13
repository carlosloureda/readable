// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import {
  PageTemplate, Header, Footer,
  PostSortSelector, CategoryFetcher, AddPostButton,
  PostList, PostContainer, CommentsList, CommentFormContainer
} from 'components'
// import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const Hero = ({post, layout, comments, showAddComment, handlers}) => {
  console.log("on HERO, handlers: ", handlers);
  return (
    <div>
      {/* Post data */}
      <PostContainer
          key={post.id}
          post={post}
          layout={layout}
          handlers={handlers}
      ></PostContainer>

      {/* <Paper elevation={4}> */}
      <div>
        {
          !showAddComment ?
          <Button onClick={handlers.onToggleCommentForm}  color="primary">
            Add comment
          </Button>
          :
          <Button onClick={handlers.onToggleCommentForm} color="secondary">
            Cancel
          </Button>
        }
      </div>
      {/* </Paper> */}
      {/* Add coment */}

      {showAddComment ? <CommentFormContainer
                          parentId={post.id}
                          addCommentCallback={handlers.onToggleCommentForm}
                        ></CommentFormContainer>: null}

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