// 这里的node代码，会用babel处理
import path from 'path'
import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Route, StaticRouter, matchPath, Switch } from 'react-router-dom'
import express from 'express'
import config from './config'

import routes from '../src/App'
import Header from '../src/component/Header'

import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
const store = getServerStore()

const app = express()
app.use(express.static('public'))

// 客户端来的api开头的请求
// 原先版本是proxy，现在是http-proxy-middleware
import { createProxyMiddleware } from 'http-proxy-middleware'
app.use(
  '/api',
  createProxyMiddleware({ target: 'http://localhost:9012', changeOrigin: true })
)
function csrRender(res) {
  // 读取csr文件 返回
  const filename = path.resolve(process.cwd(), 'public/index.spa.html')
  const html = fs.readFileSync(filename, 'utf-8')
  return res.send(html)
}
app.get('*', (req, res) => {
  if(req.query._mode === 'csr') {
    console.log('url参数开启csr降级')
    return csrRender(res)
  }
  if(config.csr){
    console.log('csr全局开关打开')
    return csrRender(res)
  }
  // 根据路由获取渲染的组件，并拿到loadData方法，获取数据

  // 存储网络请求
  const promises = []
  routes.some(route => {
    const match = matchPath(req.path, route)
    if (match) {
      const { loadData } = route.component
      if (loadData) {
        // !!!!! 如果一个组件请求报错, 如何不影响其他组件显示
        // 第一种: 规避报错, 使用promise包一层, 可以加日志--catach里
        const promise = new Promise((resolve, reject) => {
          loadData(store).then(resolve).catch(resolve)
        })
        promises.push(promise)

        // 第二种: Promise.allSettled
        // promises.push(loadData(store))
      }
    }
  })
  // 等待所有网络请求结束再渲染
  Promise.all(promises).then(() => {
    // 处理404页面
    const context = {
      css: []
    }
    // 把react组件解析成html
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Header></Header>
          <Switch>
            {routes.map(route => <Route {...route}></Route>)}
          </Switch>
        </StaticRouter>
      </Provider>
    )
    // 状态码切换和页面跳转
    // 改变错误请求状态码如404，不然都是返回200
    console.log('context', context)
    if(context.statuscode) {
      // 状态码切换
      res.status(context.statuscode)
    }
    // 状态码301 -- 页面跳转
    if(context.action === 'REPLACE') {
      res.redirect(301, context.url)
    }
    const css = context.css.join('\n')
    // 字符串模板
    res.send(`
    <html>
      <head>
        <meta charset="utf-8" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon">
        <title>react ssr</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.__context = ${JSON.stringify(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
    `)
  }).catch(()=>{
    res.send('报错页面500')
  })
})

app.listen(9010, () => {
  console.log('监听完毕')
})

