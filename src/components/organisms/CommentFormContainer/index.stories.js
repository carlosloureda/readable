import React from 'react'
import { storiesOf } from '@storybook/react'
import { CommentFormContainer } from 'components'

storiesOf('CommentFormContainer', module)
  .add('default', () => (
    <CommentFormContainer />
  ))
