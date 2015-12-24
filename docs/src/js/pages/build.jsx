'use strict';

import React from 'react';
import data from '../../../../server/data';
const {Button, Grid} = global.uiRequire();
const clone = global.uiRequire('utils/clone');

module.exports = class Page extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      building: false,
      components: clone(data)
    };
  }

  handleChange (key) {
    let components = this.state.components;
    let target = components[key];
    if (!target.$checked) {
      target.$checked = true;
      let keys = target.dependencies || [];
      keys.forEach(k => {
        components[k].$checked = true;
      });
    } else {
      target.$checked = false;
      let keys = Object.keys(components);
      for (let i = 0, count = keys.length; i < count; i++) {
        let c = components[keys[i]];
        if (c.$checked && c.dependencies && c.dependencies.indexOf(key) >= 0) {
          target.$checked = true;
          break;
        }
      }
    }
    this.setState({ components });
  }

  selectAll (e) {
    let checked = e.target.checked;
    let components = this.state.components;
    Object.keys(components).map((key) => {
      components[key].$checked = checked;
    });
    this.setState({ components });
  }

  submit () {
    this.setState({ building: true });
  }

  render () {
    let components = this.state.components;
    let checkedNum = 0;
    let list = Object.keys(components).map((key, i) => {
      let component = components[key];
      checkedNum += component.$checked ? 1 : 0;
      return (
        <Grid className="checkbox" key={i} width={8}>
          <label>
            <input name="components"
                readOnly={this.state.building}
                onChange={this.handleChange.bind(this, key)}
                checked={component.$checked}
                value={key}
                type="checkbox" />
            <span> {key}</span>
          </label>
        </Grid>
      );
    });

    return (
      <div>
        <div className="header">
          <h1>Build</h1>
        </div>

        <div className="content build-container">
          <div>
            <span>选择需要的组件</span>
            <label style={{float: 'right'}}>
              <input readOnly={this.state.building}
                  onChange={this.selectAll.bind(this)}
                  type="checkbox" />
              <span> 全选</span>
            </label>
          </div>
          <div style={{clear: 'both'}} />

          <form onSubmit={this.submit.bind(this)} action="http://216.189.159.94:8080/build" method="POST">
            <hr />
            {list}
            <hr />

            <Grid className="checkbox" width={8}>
              <label>
                <input readOnly={this.state.building} name="css" value={true} type="checkbox" />
                <span> 独立css文件</span>
              </label>
            </Grid>

            <Grid className="checkbox" width={8}>
              <label>
                <input readOnly={this.state.building} name="minimize" value={true} type="checkbox" />
                <span> Uglify 压缩</span>
              </label>
            </Grid>

            <hr />

            <Button type="submit" disabled={checkedNum === 0 || this.state.building} status="primary">{this.state.building ? '处理中，机器比较破，可能会有点延时……' : '生成代码'}</Button>
          </form>
        </div>
      </div>
    );
  }
}
