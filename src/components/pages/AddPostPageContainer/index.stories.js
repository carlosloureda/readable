// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { AddPostPageContainer } from 'components'

storiesOf('AddPostPageContainer', module)
  .add('default', () => (
    <AddPostPageContainer />
  ))
