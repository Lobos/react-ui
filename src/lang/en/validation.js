module.exports = {
  validation: {
    hints: {
      alpha: 'alpha-numeric characters, underscores, and dashes',
      alphanum: 'alpha-numeric characters and underscores',
      alpha_numeric: 'alpha-numeric characters and underscores',
      integer: 'integer',
      required: ' is required',
      max: {
        array: 'less than {0} items',
        number: 'less than {0}',
        string: 'less than {0} characters',
        datetime: 'less than {0}.'
      },
      min: {
        array: 'greater than {0} items',
        number: 'greater than {0}',
        string: 'greater than {0} characters',
        datetime: 'greater than {0}'
      },
      number: 'decimal',
      numeric: 'decimal'
    },

    tips: {
      alpha: 'The {0} field must only contain alpha characters, underscores, and dashes.',
      alphanum: 'The {0} field must only contain alpha-numeric characters.',
      alpha_numeric: 'The {0} field must only contain alpha-numeric characters.',
      email: 'The {0} field  is not valid.',
      integer: 'The {0} field must contain an integer.',
      required: 'The {0} field is required.',
      max: {
        array: 'The {0} field must not exceed {1} items in length.',
        number: 'The {0} field must less than {1}.',
        string: 'The {0} field must not exceed {1} characters in length.',
        datetime: 'The {0} field must less than {1}.'
      },
      min: {
        array: 'The {0} field must be at least {1} items in length.',
        number: 'The {0} field must greater than {1}.',
        string: 'The {0} field must be at least {1} characters in length.',
        datetime: 'The {0} field must greater than {1}.'
      },
      number: 'The {0} field must contain only numbers.',
      numeric: 'The {0} field must contain only numbers.',
      password: 'The {0} field is not valid.',
      url: 'The {0} field  is not valid.',
      fileSize: 'The {0} file size must less than {1} KB'
    }
  }
};
