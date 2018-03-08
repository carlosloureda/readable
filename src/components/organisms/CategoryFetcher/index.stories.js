// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { CategoryFetcher } from 'components'

storiesOf('CategoryFetcher', module)
  .add('default', () => (
    <CategoryFetcher />
  ))
