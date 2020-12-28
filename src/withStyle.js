import React from 'react'
// reactjs.org文档
import hoistNonReactStatic from 'hoist-non-react-statics';
function withStyle(Comp, styles) {
  // return function(props) {
  //   if(props.staticContext) {
  //     props.staticContext.css.push(styles._getCss())
  //   }
  //   return <Comp {...props} />
  // }
  function NewCom(props) {
    if(props.staticContext) {
      props.staticContext.css.push(styles._getCss())
    }
    return <Comp {...props} />
  }
  // 拷贝静态属性, 如loadData
  hoistNonReactStatic(NewCom, Comp)
  return NewCom
}
export default withStyle