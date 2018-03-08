// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { CommentContainer } from 'components'

storiesOf('CommentContainer', module)
  .add('default', () => (
    <CommentContainer />
  ))
