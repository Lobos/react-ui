var React = require('react')
var Arguments = require('../components/arguments.jsx')

module.exports = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Form.Control</h2>
        <p>表单元素，对select、datetime、tree等components上进行了封装，并对数据进行validate。Example参见<a href="#/form">Form</a></p>
        <br />

        <Arguments>
          <Arguments.Example>{'<Form.Control name="string" type="string" tip="string" label="string" width={int} maxlen={int} minlen={int} max={int} min={int} readOnly={bool} equal={string} rows={int} onChange={function} {...props} />'}</Arguments.Example>
          <Arguments.Item name="name" type="string" require={true}>键值，唯一</Arguments.Item>
          <Arguments.Item name="type" type="string" require={true}>类型，可选值为：<br />
            <code>text</code>,
            <code>email</code>,
            <code>alpha</code>,
            <code>alphanum</code>,
            <code>integer</code>,
            <code>number</code>,
            <code>url</code>,
            <code>password</code>,
            <code>checkbox</code>,
            <code>checkbox-group</code>,
            <code>radio-group</code>,
            <code>datetime</code>,
            <code>select</code>,
            <code>mult-select</code>,
            <code>tree</code>,
            <code>textarea</code>,
          </Arguments.Item>
          <Arguments.Item name="label" type="String">label文字</Arguments.Item>
          <Arguments.Item name="tip" type="String">自定义提示文字</Arguments.Item>
          <Arguments.Item name="width" type="int">宽度，1-12之间的整数，默认值为：<code>12 - form.labelWidth</code>(参见bootstrap <code>col-md-</code>)</Arguments.Item>
          <Arguments.Item name="readOnly" type="bool" def="false">为<code>true</code>时，只读。</Arguments.Item>
          <Arguments.Item name="equal" type="string">和form内某项值相等，值为该项<code>name</code></Arguments.Item>
          <Arguments.Item name="min" type="int">允许的最小值，（限number）</Arguments.Item>
          <Arguments.Item name="max" type="int">允许的最大值，（限number）</Arguments.Item>
          <Arguments.Item name="minlen" type="int">输入字符串的最小长度或多选的最少选项个数</Arguments.Item>
          <Arguments.Item name="maxlen" type="int">输入字符串的最大长度或多选的最多选项个数</Arguments.Item>
          <Arguments.Item name="rows" type="int">textarea高度</Arguments.Item>
          <p>其他参数参考各个component自定义</p>
        </Arguments>
      </div>
    )
  }
})
