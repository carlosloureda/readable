// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { CommentsList } from 'components'

storiesOf('CommentsList', module)
  .add('default', () => (
    <CommentsList />
  ))
