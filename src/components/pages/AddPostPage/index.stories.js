// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { AddPostPage } from 'components'

storiesOf('AddPostPage', module)
  .add('default', () => (
    <AddPostPage />
  ))
