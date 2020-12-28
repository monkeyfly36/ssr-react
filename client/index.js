import React from 'react'
import ReactDom from 'react-dom'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import routes from '../src/App'
import Header from '../src/component/Header'

import { Provider } from 'react-redux'
import { getClientStore } from '../src/store/store'
const store = getClientStore()

// 注水hydrate，客户端入口
const Page = (<Provider store={store}>
  <BrowserRouter>
    <Header></Header>
    <Switch>
      {routes.map(route => <Route key={route.key} {...route}></Route>)}
    </Switch>
  </BrowserRouter>
</Provider>)

// ???
if(window.__context) {
  // ssr -> csr
  ReactDom.hydrate(Page, document.getElementById('root'))
} else {
  ReactDom.render(Page, document.getElementById('root'))
}

