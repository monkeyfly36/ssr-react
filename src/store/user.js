// 首页逻辑
import axios from 'axios'

// actionType
const GET_LIST = 'INDEX/USER_INFO'

// actionCreator
const changeUserInfo = data => ({
  type: GET_LIST,
  data
})

// 在服务端发送请求，浏览器XHR不会有请求
export const getUserInfo = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get('http://localhost:9012/api/user/info')
      .then(res => {
        const { data } = res.data
        dispatch(changeUserInfo(data))
      })
  }
}

const defaultState = {
  userinfo: {}
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        userinfo: action.data
      }
      return newState
    default:
      return state
  }
}
