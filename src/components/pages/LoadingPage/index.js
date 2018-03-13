// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import {
  PageTemplate, Header, Footer,
  LinearLoader
} from 'components'

const LoadingPage = ({}) => {
  return (
    <PageTemplate
      header={<Header />}
      hero={<LinearLoader />}
      footer={<Footer />}
      >
    </PageTemplate>
  )
}

export default LoadingPage