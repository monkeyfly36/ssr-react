// 首页逻辑

// actionType
const GET_LIST = 'INDEX/GET_LIST'

// actionCreator
const changeList = list => ({
  type: GET_LIST,
  list
})

// 在服务端发送请求，浏览器XHR不会有请求
export const getIndexList = server => {
  return (dispatch, getState, $axios) => {
    return $axios.get('/api/course/list')
      .then(res => {
        const { list } = res.data
        dispatch(changeList(list))
      })
  }
}

const defaultState = {
  list: []
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case GET_LIST:
      const newState = {
        ...state,
        list: action.list
      }
      return newState
    default:
      return state
  }
}
