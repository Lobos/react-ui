export default {
  validation: {
    hints: {
      alpha: 'alpha-numeric characters, underscores, and dashes',
      alphanum: 'alpha-numeric characters and underscores',
      integer: 'integer',
      json: 'json format',
      max: {
        array: 'less than {0} choices',
        number: 'less than {0}',
        string: 'less than {0} characters'
      },
      min: {
        array: 'greater than {0} choices',
        number: 'greater than {0}',
        string: 'greater than {0} characters'
      },
      minmax: {
        array: 'between {0} - {1} choices',
        number: 'between {0} - {1}',
        string: '{0} - {1} characters'
      },
      number: 'number'
    },

    tips: {
      alpha: 'The {0} field must only contain alpha characters, underscores, and dashes.',
      alphanum: 'The {0} field must only contain alpha-numeric characters.',
      email: 'The {0} field should be a valid email.',
      integer: 'The {0} field should be a valid integer.',
      json: 'The {0} field not a valid json.',
      required: 'The {0} field is required.',
      max: {
        array: 'The {0} must select not exceed {1} choices.',
        number: 'The {0} field must less than {1}.',
        string: 'The {0} field must not exceed {1} characters.',
        datetime: 'The {0} field must less than {1}.'
      },
      min: {
        array: 'The {0} must select at least {1} choices.',
        number: 'The {0} field must greater than {1}.',
        string: 'The {0} field must be at least {1} characters.',
        datetime: 'The {0} field must greater than {1}.'
      },
      number: 'The {0} field should be a valid number.',
      password: 'The {0} field is not valid.',
      url: 'The {0} field is not valid.',
      fileSize: 'The {0} file size must less than {1} KB'
    },

    img: {
      width: 'image width must be {0}px',
      height: 'image height must be {0}px'
    },

    checking: 'checking'
  }
}
