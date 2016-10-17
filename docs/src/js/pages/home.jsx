'use strict'

import React from 'react'
import { Icon } from 'rctui'
import { Cn, En } from '../Language'

module.exports = class Home extends React.Component {
  render () {
    return (
      <div>
        <div className="hero">
          <div className="hero-title">
            <h1>React UI</h1>
            <Cn tag="h2">React组件库，样式基于<a href="http://getbootstrap/">bootstrap 4.0</a>。</Cn>
            <En tag="h2">React Components，base on <a href="http://getbootstrap/">bootstrap 4.0</a>.</En>
            <div style={{marginTop: 40}}>
              <a className="rct-button button-large button-extend" href="https://github.com/Lobos/react-ui"><Icon icon="github" /> Github</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
