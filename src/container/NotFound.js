import React from 'react'
import { Route } from 'react-router-dom'

// 错误请求对应的状态处理
function Status({code, children}) {
  return <Route render = {({ staticContext }) => {
    if (staticContext) staticContext.statuscode = code // 404
    return children
  }}></Route>
}

function NotFound(props) {
  console.log('notfound', props)
  // 渲染了这个组件，给staticContext赋值，statuscode=404
  return <Status code={404}>
    <h1>NotFound</h1>
    <img id="img-404" src="/404.jpg" alt="" />
  </Status>
}

export default NotFound