import 'react-hot-loader/patch'
import React from 'react'
import { basename } from 'config'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/index.js'
import App from 'components/App'


const loggerMiddleware = createLogger()

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    ),
  )
);

const renderApp = () => (
  <BrowserRouter basename={basename}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)

const root = document.getElementById('app')
render(renderApp(), root)

if (module.hot) {
  module.hot.accept('components/App', () => {
    require('components/App')
    render(renderApp(), root)
  })
}
