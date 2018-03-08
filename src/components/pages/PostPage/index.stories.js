// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { PostPage } from 'components'

storiesOf('PostPage', module)
  .add('default', () => (
    <PostPage />
  ))
