// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import {
  PageTemplate, Header, Footer,
  LinearLoader
} from 'components'

const Hero = () => {
    return (
      <div>
        <div className="error-page">
          <div>
            <h1>404</h1>
            <p>NOT FOUND</p>
          </div>
        </div>
      </div>
    )
}
const Page404 = ({}) => {
  return (
    <PageTemplate
      header={<Header />}
      hero={<Hero />}
      footer={<Footer />}
      >
    </PageTemplate>
  )
}

export default Page404