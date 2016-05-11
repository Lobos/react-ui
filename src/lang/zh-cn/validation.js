module.exports = {
  validation: {
    hints: {
      alpha: '英文字符，"-"，"_"',
      alphanum: '数字、英文字符和"_"',
      alpha_numeric: '数字、英文字符和"_"',
      integer: '整数',
      required: '必填',
      max: {
        array: '最多选择 {0} 个选项',
        number: '最大值 {0}',
        string: '最大长度 {0} 个字符'
      },
      min: {
        array: '最少选择 {0} 个选项',
        number: '最小值 {0}',
        string: '最小长度 {0} 个字符'
      },
      number: '数字',
      numeric: '数字',
      password: '英文字符,数字,特殊字符'
    },

    tips: {
      alpha: '{0} 只能包含英文字符，"-"，"_"',
      alphanum: '{0} 只能包含数字、英文字符和"_"',
      alpha_numeric: '{0} 只能包含数字、英文字符和"_"',
      email: '{0} 格式不正确',
      integer: '{0} 必须为整数',
      required: '{0} 不能为空',
      max: {
        array: '{0} 最多选择 {1} 个选项',
        number: '{0} 不能大于 {1}',
        string: '{0} 最大长度不能超过 {1} 个字符',
        datetime: '{0} 时间不能晚于 {1}'
      },
      min: {
        array: '{0} 最少选择 {1} 个选项',
        number: '{0} 不能小于 {1}',
        string: '{0} 最小长度不能少于 {1} 个字符',
        datetime: '{0} 时间不能早于 {1}'
      },
      number: '{0} 必须为数字',
      numeric: '{0} 必须为数字',
      password: '{0} 含有非法字符',
      url: '{0} 格式不正确',
      hex: '{0} 格式不正确，应为6位16进制字符串。例：#ffffff)',
      rgb: '{0} 格式不正确，应为逗号分隔、三个0-255组成的数组。例：rgb(255,255,255)',
      rgba: '{0} 格式不正确，应为三个0-255和0-1组成的数组。例：rgba(255,255,255,1)',
      hsv: '{0} 格式不正确，应为色相(0-360)、彩度(0-100)、明度(0-100)组成的数组。例：hsv(360,100%,100%)',
      fileSize: '{0} 最大上传文件大小不能超过 {1} KB'
    }
  }
};
