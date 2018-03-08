import React from 'react'
import { storiesOf } from '@storybook/react'
import { AddPostButton } from 'components'

storiesOf('AddPostButton', module)
  .add('default', () => (
    <AddPostButton icon="close">Hello</AddPostButton>
  ))
  .add('transparent', () => (
    <AddPostButton icon="close" transparent>Hello</AddPostButton>
  ))
  .add('with icon on right', () => (
    <AddPostButton icon="close" right>Hello</AddPostButton>
  ))
  .add('responsive', () => (
    <AddPostButton icon="close" responsive>Decrease panel width</AddPostButton>
  ))
  .add('responsive with breakpoint', () => (
    <AddPostButton icon="close" breakpoint={300} responsive>Decrease panel width to 300</AddPostButton>
  ))
  .add('without text', () => (
    <AddPostButton icon="close" />
  ))
  .add('collapsed', () => (
    <AddPostButton icon="close" collapsed>Hello</AddPostButton>
  ))
  .add('height', () => (
    <AddPostButton icon="close" height={100}>Hello</AddPostButton>
  ))
