'use strict';

import React, { PropTypes } from 'react';
import Form from '../Form';
import Modal from '../Modal';
import FormControl from '../FormControl';
import FormSubmit from '../FormSubmit';
import ControlBuilder from './ControlBuilder';
import ItemBuilder from './ItemBuilder';
import clone from '../utils/clone';

import { requireCss } from '../themes';
requireCss('form-builder');

class FormBuilder extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      controls: props.controls
    };
  }

  editControl (index) {
    const isEdit = typeof index === 'number';
    const control = isEdit ? this.state.controls[index] : {};

    let mid = Modal.open({
      header: '编辑Control',
      width: 680,
      content: <ControlBuilder control={control} onSubmit={
        (res) => {
          let { controls } = this.state;
          if (isEdit) {
            controls[index] = res;
          } else {
            res.items = [];
            controls.push(res);
            this.editItem(controls.length - 1);
          }
          this.setState({ controls });
          Modal.close(mid);
        }
      } />
    });
  }

  removeControl (c) {
    let { controls } = this.state;
    controls.splice(c, 1);
    this.setState({});
  }

  editItem (c, i) {
    const items = this.state.controls[c].items;
    const isEdit = typeof i === 'number';
    const item = isEdit ? clone(items[i]) : {};

    let mid = Modal.open({
      header: '编辑Item',
      width: 680,
      content: <ItemBuilder item={item} onSubmit={
        (res) => {
          if (isEdit) {
            items[i] = res;
          } else {
            items.push(res);
          }
          this.setState({});
          Modal.close(mid);
        }
      } />
    });
  }

  removeItem (c, i) {
    const items = this.state.controls[c].items;
    items.splice(i, 1);
    this.setState({});
  }

  renderItems (c, items) {
    return items.map((item, i) => {
      return (
        <div key={i}>
          { item.name } :&nbsp;
          <a onClick={this.editItem.bind(this, c, i)} href="javascript:;">编辑</a>
          <a onClick={this.removeItem.bind(this, c, i)} href="javascript:;">删除</a>
        </div>
      );
    });
  }

  renderControls () {
    return this.state.controls.map((control, i) => {
      let props = clone(control);
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
      );
    });
  }

  render () {
    return (
      <div style={this.props.style}>
        <Form onSubmit={(data) => {console.log(JSON.stringify(data, null, 2))}}>
          {this.renderControls()}
          <FormSubmit>确定</FormSubmit>
          <FormControl>
            <div onClick={this.editControl.bind(this)} className="fb-btn-control">+ Add new Control</div>
            <div onClick={this.editControl.bind(this)} className="fb-btn-control">导入Json</div>
            <div onClick={this.exportControls.bind(this)} className="fb-btn-control">导出Json</div>
          </FormControl>
        </Form>
      </div>
    );
  }

  exportControls () {
    Modal.open({
      content: <div>{JSON.stringify(this.state.controls, null, 4)}</div>,
      buttons: {
        '确定': true
      }
    });
  }
}

FormBuilder.propTypes = {
  controls: PropTypes.array,
  style: PropTypes.object
};

FormBuilder.defaultProps = {
  controls: [],
  style: { width: 700 }
};

module.exports = FormBuilder;

