import React from 'react'
import { PostContainer } from 'components'

const PostList = ({posts}) => {
  return (
    <ul>
      {posts && posts.map(post =>
        <PostContainer
          key={post.id}
          post={post}
          layout={"LIST_ITEM"}
        ></PostContainer>
      )}
    </ul>
  )
}

export default PostList
