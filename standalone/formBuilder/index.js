'use strict';

import ReactDOM from 'react-dom';
import FormBuilder from '../../src/addons/FormBuilder';

import { setTheme } from '../../src/themes/index';
setTheme();

var controls = [
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
  { label: 'select', items: [{type: 'select', name: 'select', grid: 1/3, data: { shanghai: '上海', beijing: '北京', hangzhou: '杭州', guangzhou: '广州', shenzhen: '深圳' } }]},
  { label: 'checkbox-group', items: [{type: 'checkbox-group', name: 'checkbox-group', min: 2, data: { shanghai: '上海', beijing: '北京', hangzhou: '杭州', guangzhou: '广州', shenzhen: '深圳' } }]},
  { label: 'radio-group', items: [{type: 'radio-group', name: 'radio-group', data: { shanghai: '上海', beijing: '北京', hangzhou: '杭州', guangzhou: '广州', shenzhen: '深圳' } }]},
  { label: 'textarea', items: [{ type: 'textarea', name: 'textarea', autoHeight: true }]}
];

ReactDOM.render(
  <FormBuilder controls={controls} />,
  document.getElementById('form')
);
