import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'

import { AddPostPage } from 'components'
import { PostsListPageContainer, PostPageContainer, AddPostPageContainer } from 'components'

// import createHistory from "history/createBrowserHistory"
// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  body {
    margin: 0;
  }
`
// Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory()

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" component={PostsListPageContainer} exact />
        <Route path="/category/:category" component={PostsListPageContainer} exact />
        <Route path="/post/new" component={AddPostPageContainer} />
        <Route path="/post/edit/:postId" component={AddPostPageContainer} />
        <Route path="/post/:postId" component={PostPageContainer} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
