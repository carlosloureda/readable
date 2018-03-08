import React from 'react'
import { mount, shallow } from 'enzyme'
import AddPostButton from '.'

const wrap = (props = {}) => shallow(<AddPostButton icon="github" {...props} />)

it('mounts with different combination of props', () => {
  mount(<AddPostButton icon="github">test</AddPostButton>)
  mount(<AddPostButton icon="github" right>test</AddPostButton>)
  mount(<AddPostButton icon="github" responsive>test</AddPostButton>)
  mount(<AddPostButton icon="github" collapsed>test</AddPostButton>)
  mount(<AddPostButton icon="github" right responsive>test</AddPostButton>)
  mount(<AddPostButton icon="github" />)
  mount(<AddPostButton icon="github" right />)
  mount(<AddPostButton icon="github" responsive />)
  mount(<AddPostButton icon="github" right responsive />)
})

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'test' })
  expect(wrapper.contains('test')).toBe(true)
})

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})

it('passes height to icon', () => {
  const wrapper = wrap({ height: 20 })
  expect(wrapper.find({ height: 20 / 2.5 })).toHaveLength(1)
})
