// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { PostList } from 'components'

storiesOf('PostList', module)
  .add('default', () => (
    <PostList />
  ))
