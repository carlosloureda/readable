import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'

import { AddPostPage } from 'components'
import { PostsListPageContainer, PostPageContainer, AddPostPageContainer } from 'components'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  body {
    margin: 0;
  }
`

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" component={PostsListPageContainer} exact />
        <Route path="/post/new" component={AddPostPageContainer} />
        <Route path="/post/edit/:postId" component={AddPostPageContainer} />
        <Route path="/post/:postId" component={PostPageContainer} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
