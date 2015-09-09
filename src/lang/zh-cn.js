/*
"use strict"

const data = {
  request: {
    status: {
      400: '非法请求',
      401: '没有访问权限',
      403: '请求被拒绝',
      404: '所请求的地址不存在',
      405: '请求的 HTTP 方法不被允许',
      500: '服务器错误',
      503: '服务器错误'
    },
    loading: '读取中...',
    empty: '未知错误.',
    failure: '操作失败.'
  },
  buttons: {
    add: '新建',
    back: '返回',
    cancel: '取消',
    clear: '清空',
    fields: '字段',
    filter: '筛选',
    ok: '确定',
    refresh: '刷新',
    reset: '重置',
    save: '保存'
  },
  date: {
    year: '年',
    month: '月',
    fullMonth: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    shortMonth: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    weekday: ['日', '一', '二', '三', '四', '五', '六'],
    format: {
      year: 'yyyy年',
      month: 'MM月',
      date: 'yyyy-MM-dd',
      datetime: 'yyyy-MM-dd hh:mm:ss',
      time: 'hh:mm:ss'
    }
  },
  validation: {
    hints: {
      alpha: '英文字符，"-"，"_"',
      alphanum: '数字、英文字符和"_"',
      integer: '整数',
      required: '必填',
      max: {
        array: '最多选择 {0}个选项',
        number: '最大值 {0}',
        string: '最大长度 {0} 个字符'
      },
      min: {
        array: '最少选择 {0}个选项',
        number: '最小值 {0}',
        string: '最小长度 {0} 个字符'
      },
      number: '数字',
      password: '大写英文字符,小写英文字符,数字,特殊字符'
    },
    tips: {
      alpha: '只能包含英文字符，"-"，"_"',
      alphanum: '只能包含数字、英文字符和"_"',
      email: '格式不正确',
      integer: '必须为整数',
      required: '不能为空',
      max: {
        array: '最多选择 {0} 个选项',
        number: '不能大于 {0}',
        string: '最大长度不能超过 {0} 个字符'
      },
      min: {
        array: '最少选择 {0} 个选项',
        number: '不能小于 {0}',
        string: '最小长度不能少于 {0} 个字符'
      },
      number: '必须为数字',
      password: '含有非法字符',
      url: '格式不正确',
      hex: '格式不正确，应为6位16进制字符串。例：#ffffff)',
      rgb: '格式不正确，应为逗号分隔、三个0-255组成的数组。例：rgb(255,255,255)',
      rgba: '格式不正确，应为三个0-255和0-1组成的数组。例：rgba(255,255,255,1)',
      hsv: '格式不正确，应为色相(0-360)、彩度(0-100)、明度(0-100)组成的数组。例：hsv(360,100%,100%)',
      fileSize: '最大上传文件大小不能超过 {0} KB'
    }
  }
}

require('./index').setLang(data)
*/
