import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user'
import { Redirect } from "react-router-dom";

function User(props) {
  console.log(props.userinfo)
  return <Redirect to='/about'></Redirect>
  // <div>
  //   nihao {props.userinfo.title} - {props.userinfo.name}
  // </div>
}
// ssr, 服务端请求获取数据
User.loadData = store => {
  return store.dispatch(getUserInfo())
}

export default connect(
  state => ({userinfo: state.user.userinfo}),
  // { getUserInfo }
)(User)
