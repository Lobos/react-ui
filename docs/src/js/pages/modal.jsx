'use strict'

import React from 'react'
import prettify from '../prettify'
const {Modal} = global.uiRequire()

@prettify
export default class Page extends React.Component {
  static displayName = 'Pages/Modal'

  render () {
    return (
      <div>
        <div className="header">
          <h1>Modal</h1>
          <h2>对话框</h2>
        </div>

        <div className="content">
          <h2 className="subhead">Modal.alert(content)</h2>
          <div>
            <a onClick={() => Modal.alert('这是一个alert')}>alert</a>
          </div>
        </div>
      </div>
    )
  }
}
