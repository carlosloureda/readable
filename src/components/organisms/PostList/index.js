import React from 'react'
import { PostContainer } from 'components'

const PostList = ({posts}) => {
  return (
    <ul>
      {posts && Object.keys(posts).map(postId =>
          <PostContainer
            key={postId}
            post={posts[postId]}
            layout={"LIST_ITEM"}
          ></PostContainer>
      )}
    </ul>
  )
}

export default PostList
