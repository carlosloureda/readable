// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { PostsListPageContainer } from 'components'

storiesOf('PostsListPageContainer', module)
  .add('default', () => (
    <PostsListPageContainer />
  ))
