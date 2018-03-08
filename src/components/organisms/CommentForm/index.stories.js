import React from 'react'
import { storiesOf } from '@storybook/react'
import { CommentForm } from 'components'

storiesOf('CommentForm', module)
  .add('default', () => (
    <CommentForm />
  ))
