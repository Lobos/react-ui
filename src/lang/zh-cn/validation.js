module.exports = {
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
};
