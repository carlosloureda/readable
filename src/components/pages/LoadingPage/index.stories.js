// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { LoadingPage } from 'components'

storiesOf('LoadingPage', module)
  .add('default', () => (
    <LoadingPage />
  ))
