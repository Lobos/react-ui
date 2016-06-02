'use strict'

import React, { PropTypes } from 'react'
import Form from '../Form'
import Modal from '../Modal'
import FormControl from '../FormControl'
import FormSubmit from '../FormSubmit'
import Textarea from '../Textarea'
import ControlBuilder from './ControlBuilder'
import ItemBuilder from './ItemBuilder'
import clone from '../utils/clone'

import { requireCss } from '../themes'
requireCss('form-builder')

const DEMO_DATA = [
  { label: 'text', items: [{ type: 'text', name: 'text', required: true, min: 3, max: 12, grid: 1 }]},
  { label: 'email', items: [{type: 'email', name: 'email', grid: 1 }]},
  { label: 'readonly', items: [{type: 'text', name: 'readonly', readOnly: true }]},
  { label: 'datetime', items: [{type: 'datetime', name: 'datetime', required: true, tip: '自定义tip文字' }]},
  { label: 'tree', items: [{type: 'tree', name: 'tree', fetch: { url: 'json/tree.json' }, selectAble: true }]},
  { label: 'two items',
    items: [
      { type: 'date', name: 'startTime', min: '2016-03-20' },
      '-',
      { type: 'date', name: 'endTime' }
    ]
  },
  { label: 'select', items: [{type: 'select', name: 'select', grid: 1 / 3, data: { shanghai: '上海', beijing: '北京', hangzhou: '杭州', guangzhou: '广州', shenzhen: '深圳' } }]},
  { label: 'checkbox-group', items: [{type: 'checkbox-group', name: 'checkbox-group', min: 2, data: { shanghai: '上海', beijing: '北京', hangzhou: '杭州', guangzhou: '广州', shenzhen: '深圳' } }]},
  { label: 'radio-group', items: [{type: 'radio-group', name: 'radio-group', data: { shanghai: '上海', beijing: '北京', hangzhou: '杭州', guangzhou: '广州', shenzhen: '深圳' } }]},
  { label: 'textarea', items: [{ type: 'textarea', name: 'textarea', autoHeight: true }]}
]

class FormBuilder extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      controls: props.controls
    }

    this.exportControls = this.exportControls.bind(this)
    this.importDemo = this.importDemo.bind(this)
  }

  editControl (index) {
    const isEdit = typeof index === 'number'
    const control = isEdit ? this.state.controls[index] : {}

    let mid = Modal.open({
      header: '编辑Control',
      width: 680,
      content: <ControlBuilder control={control} onSubmit={
        (res) => {
          let { controls } = this.state
          if (isEdit) {
            controls[index] = res
          } else {
            res.items = []
            controls.push(res)
            this.editItem(controls.length - 1)
          }
          this.setState({ controls })
          Modal.close(mid)
        }
      } />
    })
  }

  removeControl (c) {
    let { controls } = this.state
    controls.splice(c, 1)
    this.setState({})
  }

  editItem (c, i) {
    const items = this.state.controls[c].items
    const isEdit = typeof i === 'number'
    const item = isEdit ? clone(items[i]) : {}

    let mid = Modal.open({
      header: '编辑Item',
      width: 680,
      content: <ItemBuilder item={item} onSubmit={
        (res) => {
          if (isEdit) {
            items[i] = res
          } else {
            items.push(res)
          }
          this.setState({})
          Modal.close(mid)
        }
      } />
    })
  }

  removeItem (c, i) {
    const items = this.state.controls[c].items
    items.splice(i, 1)
    this.setState({})
  }

  renderItems (c, items) {
    return items.map((item, i) => {
      return (
        <div key={i}>
          { item.name } :&nbsp;
          <a onClick={this.editItem.bind(this, c, i)} href="javascript:;">编辑</a>
          <a onClick={this.removeItem.bind(this, c, i)} href="javascript:;">删除</a>
        </div>
      )
    })
  }

  renderControls () {
    return this.state.controls.map((control, i) => {
      let props = clone(control)
      return (
        <FormControl className="fb-control" key={i} {...props}>
          <div className="fb-control-tool">
            <div className="fb-control-tool-inner">
              <a href="javascript:;" onClick={this.editControl.bind(this, i)}>编辑</a>
              <a href="javascript:;" onClick={this.removeControl.bind(this, i)}>删除</a>
              <a href="javascript:;" onClick={this.editItem.bind(this, i)}>增加Item</a>
              {this.renderItems(i, props.items)}
            </div>
          </div>
        </FormControl>
      )
    })
  }

  importDemo () {
    this.setState({ controls: clone(DEMO_DATA) })
  }

  exportControls () {
    Modal.open({
      content: <Textarea rows={20} value={JSON.stringify(this.state.controls, null, 4)} />,
      width: 900,
      header: 'JSON Schema',
      buttons: {
        '确定': true
      }
    })
  }

  render () {
    return (
      <div style={this.props.style}>
        <Form onSubmit={(data) => { console.log(JSON.stringify(data, null, 2)) }}>
          {this.renderControls()}
          <FormSubmit>确定</FormSubmit>
          <FormControl>
            <div onClick={this.editControl.bind(this)} className="fb-btn-control">+ Add new Control</div>
            <div onClick={this.importDemo} className="fb-btn-control">导入Demo</div>
            <div onClick={this.exportControls} className="fb-btn-control">导出Json</div>
          </FormControl>
        </Form>
      </div>
    )
  }
}

FormBuilder.propTypes = {
  controls: PropTypes.array,
  style: PropTypes.object
}

FormBuilder.defaultProps = {
  controls: [],
  style: { width: 700 }
}

module.exports = FormBuilder

