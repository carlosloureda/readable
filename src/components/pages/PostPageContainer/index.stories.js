// https://github.com/diegohaz/arc/wiki/Storybook
import React from 'react'
import { storiesOf } from '@storybook/react'
import { PostPageContainer } from 'components'

storiesOf('PostPageContainer', module)
  .add('default', () => (
    <PostPageContainer />
  ))
