/*
 * @Author: your name
 * @Date: 2020-12-23 10:46:27
 * @LastEditTime: 2020-12-26 12:16:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /reactssr/src/App.js
 */
import React from 'react'
import { Route } from 'react-router-dom'
import Index from './container/Index'
import About from './container/About'
import User from './container/User'
import NotFound from './container/NotFound'
// import './App.css'

// export default (
//   <div>
//     <Route path="/" exact component={Index}></Route>
//     <Route path="/about" exact component={About}></Route>
//   </div>
// )

// 改造成js的配置，才能获取组件
export default [
  {
    path:"/",
    component:Index,
    exact:true,
    key:'index',
  },
  {
    path:"/about",
    component:About,
    exact:true,
    key:'about'
  },
  {
    path:"/user",
    component:User,
    exact:true,
    key:'user'
  },
  {
    component:NotFound,
    key:'notfound'
  },
]