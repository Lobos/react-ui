import React from 'react'
import Code from '../Code'
import Example from '../Example'
const {Tip} = global.uiRequire()

module.exports = class extends React.Component {

  render () {
    return (
      <div>
        <div className="header">
          <h1>Tip</h1>
          <h2>弹出提示框</h2>
        </div>

        <div className="content button-docs">
          <Code>
 {`<Tip
  className: {string}   //要加的className
  style: {object},      //style
  position: {string},   //仅支持'top' 或者 'bottom'，默认top
  trigger: {string},    //触发方式，仅支持'click' 或者 'hover'，默认hover
  show: {boolean}       //是否默认展开
  >
  <div>要触发的节点</div>
  <div>弹框里要展示的内容</div>
</Tip>`}
          </Code>

          <h2 className="subhead">展标移上去提示，默认展示在上面</h2>
<Example>
<Tip>
  <span>鼠标移上展开提示</span>
  <div style={{width:'120px'}}>
    活动名称仅用于商家自己管理活动,不会显示给消费者
  </div>
</Tip>
</Example>



          <h2 className="subhead">鼠标点击展开提示，展示在下面</h2>
<Example>
<Tip trigger="click" position="top">
  <span>点开展开提示</span>
  <div style={{width:'120px'}}>
    this is tip content!!!
  </div>
</Tip>
</Example>

        </div>
      </div>
    )
  }
}
