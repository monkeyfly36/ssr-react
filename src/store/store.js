// 存储入口
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'
import indexReducer from './index'
import userReducer from './user'

const reducer = combineReducers({
  index: indexReducer,
  user: userReducer,
})

// 一个是ssr服务端请求代理, 一个是客户端请求-先请求srrnode, 再转发
const serverAxios = axios.create({
  baseURL: 'http://localhost:9012'
})
const clientAxios = axios.create({
  baseURL: '/'
})
// 创建客户端store
export const getClientStore = () => {
  // 通过window.__context获取数据
  const defaultState = window.__context ? window.__context : {}
  return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
// 创建服务端store
export const getServerStore = () => {
  // 通过server的dispatch来获取和充实
  // redux-thunk源码
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}