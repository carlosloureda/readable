import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import { Icon } from 'components'
import { Link } from 'react-router-dom'

const Credits = styled.div`
  vertical-align: center;
  text-align: center;
  margin: 0;
`

const Footer = () => {
  return (
    <Credits>
      Made with <Icon icon="heart" /> for <Link to="https://www.udacity.com/">Udacity</Link>
    </Credits>
  )
}

export default Footer
