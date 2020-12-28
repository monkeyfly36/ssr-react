import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
import styles from './Index.css'
import withStyle from '../withStyle'

function Index(props) {
  const [count, setCount] = useState(1)
  useEffect(() => {
    // 此时还是在前端渲染, 能不能放在后端完成
    // ->同构实现，如果首次加载不是Index页面，客户端获取
    if(!props.list.length) {
      props.getIndexList()
    }
  }, [])
  return <div className={styles.container}>
    <div className={styles.title}>count: {count}</div>
    <button onClick={() => setCount(count+1)}>累加</button>
    <hr/>
    <ul>
      {props.list.map(item => {
        return <li key={item.id}>{item.name}</li>
      })}
    </ul>
  </div>
}
// ssr, 服务端请求获取数据 --> 修改原因: export的是withStyle(Index, styles), 不是Index, 没有loadData
// Index.loadData = store => {
//   return store.dispatch(getIndexList())
// }

// export default connect(
//   state => ({list: state.index.list}),
//   { getIndexList }
// )(withStyle(Index, styles))

// 修改1 -- hoist-non-react-statics
Index.loadData = store => {
  return store.dispatch(getIndexList())
}

export default connect(
  state => ({list: state.index.list}),
  { getIndexList }
)(withStyle(Index, styles))

// 修改2
// let NewIndex = connect(
//   state => ({list: state.index.list}),
//   { getIndexList }
// )(withStyle(Index, styles))

// NewIndex.loadData = store => {
//   return store.dispatch(getIndexList())
// }
// export default NewIndex