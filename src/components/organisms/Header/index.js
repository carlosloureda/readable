import React from 'react'
import styled from 'styled-components'
import { size } from 'styled-theme'
import { withRouter } from 'react-router-dom'
// import { Block } from 'components'
// import { IconLink, PrimaryNavigation, Block } from 'components'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  @media screen and (max-width: 640px) {
    padding: 0.5rem;
  }
`

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: ${size('maxWidth')};
  > :not(:first-child) {
    margin-left: 1rem;
  }
`

const Header = withRouter(({props, history}) => {
  return (
    <Wrapper opaque reverse {...props}>
      <InnerWrapper>
        <h1 onClick={() => history.push('/')}>READABLE</h1>
        {/* <IconLink to="/" icon="arc" height={100} /> */}
        {/* <PrimaryNavigation reverse /> */}
      </InnerWrapper>
    </Wrapper>
  )
})

export default Header
