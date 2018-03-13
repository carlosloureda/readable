import React from 'react'
import { PostContainer, Icon } from 'components'
import List, {ListItem} from 'material-ui/List';

const PostList = ({posts}) => {
  if (posts) {
    return (
      <List>
        {Object.keys(posts).map(postId =>
            <PostContainer
              key={postId}
              post={posts[postId]}
              layout={"LIST_ITEM"}
            ></PostContainer>
        )}
      </List>
    )
  }
   else {
    return (<ListItem>Sorry :( No posts for this category. Feeling like adding a new one?</ListItem>)
  }
}

export default PostList
