// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { Comment } from 'components'

storiesOf('Comment', module)
  .add('default', () => (
    <Comment />
  ))
