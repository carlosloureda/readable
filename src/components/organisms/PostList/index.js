import React from 'react'
import { PostContainer } from 'components'
import List from 'material-ui/List';

const PostList = ({posts}) => {
  return (
    <List>
      {posts && Object.keys(posts).map(postId =>
          <PostContainer
            key={postId}
            post={posts[postId]}
            layout={"LIST_ITEM"}
          ></PostContainer>
      )}
    </List>
  )
}

export default PostList
