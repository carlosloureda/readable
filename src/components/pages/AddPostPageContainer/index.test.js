// https://github.com/diegohaz/arc/wiki/Testing-components
import React from 'react'
import { shallow } from 'enzyme'
import AddPostPageContainer from '.'

it('renders', () => {
  shallow(<AddPostPageContainer />)
})
