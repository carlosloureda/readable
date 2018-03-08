// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { PostsListPage } from 'components'

storiesOf('PostsListPage', module)
  .add('default', () => (
    <PostsListPage />
  ))
