import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import { Icon } from 'components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  background-color: ${palette('grayscale', 1, true)};
  padding: 0.4rem;
`

const Credits = styled.div`
  vertical-align: center;
  text-align: center;
  margin: 0;
`

const Footer = (props) => {
  return (
    <Wrapper {...props}>
      { <Credits>
        Made with <Icon icon="heart" /> for <Link to="https://www.udacity.com/">Udacity</Link>
      </Credits>}
      {/* <h3>Carlos Loureda Parrado</h3> */}
    </Wrapper>
  )
}

export default Footer
