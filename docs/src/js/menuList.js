
module.exports = [
  'BASE',

  {
    path: '/alert',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/alert.jsx'))
      })
    }
  },

  {
    path: '/button',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/button.jsx'))
      })
    }
  },

  {
    path: '/buttonGroup',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/buttonGroup.jsx'))
      })
    }
  },

  {
    path: '/dropdown',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/dropdown.jsx'))
      })
    }
  },

  {
    path: '/icon',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/icon.jsx'))
      })
    }
  },

  {
    path: '/image',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/image.jsx'))
      })
    }
  },

  {
    path: '/lang',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/lang.jsx'))
      })
    }
  },

  {
    path: '/switch',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/switch.jsx'))
      })
    }
  },

  {
    path: '/tag',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/tag.jsx'))
      })
    }
  },

  'LAYOUT',

  {
    path: '/breadcrumb',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/breadcrumb.jsx'))
      })
    }
  },

  {
    path: '/grid',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/grid.jsx'))
      })
    }
  },

  {
    path: '/nav',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/nav.jsx'))
      })
    }
  },

  {
    path: '/card',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/card.jsx'))
      })
    }
  },

  'FORM',

  {
    path: '/form',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/form.jsx'))
      })
    }
  },

  {
    path: '/formItem',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/formItem.jsx'))
      })
    }
  },

  {
    path: '/formControl',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/formControl.jsx'))
      })
    }
  },

  {
    path: '/cascade',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/cascade.jsx'))
      })
    }
  },

  {
    path: '/checkbox',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/checkbox.jsx'))
      })
    }
  },

  {
    path: '/checkboxGroup',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/checkboxGroup.jsx'))
      })
    }
  },

  {
    path: '/datepicker',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/datepicker.jsx'))
      })
    }
  },

  {
    path: '/input',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/input.jsx'))
      })
    }
  },

  {
    path: '/textArea',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/textArea.jsx'))
      })
    }
  },

  {
    path: '/radioGroup',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/radioGroup.jsx'))
      })
    }
  },

  {
    path: '/rating',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/rating.jsx'))
      })
    }
  },

  {
    path: '/select',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/select.jsx'))
      })
    }
  },

  {
    path: '/tree',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/tree.jsx'))
      })
    }
  },

  {
    path: '/upload',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/upload.jsx'))
      })
    }
  },

  {
    path: '/imgUpload',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/imgUpload.jsx'))
      })
    }
  },

  'COMMON',

  {
    path: '/filter',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/filter.jsx'))
      })
    }
  },

  {
    path: '/pagination',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/pagination.jsx'))
      })
    }
  },

  {
    path: '/progress',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/progress.jsx'))
      })
    }
  },

  {
    path: '/mask',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/mask.jsx'))
      })
    }
  },

  {
    path: '/modal',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/modal.jsx'))
      })
    }
  },

  {
    path: '/message',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/message.jsx'))
      })
    }
  },

  {
    path: '/popover',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/popover.jsx'))
      })
    }
  },

  {
    path: '/spin',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/spin.jsx'))
      })
    }
  },

  {
    path: '/timeago',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/timeago.jsx'))
      })
    }
  },

  {
    path: '/tooltip',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/tooltip.jsx'))
      })
    }
  },

  {
    path: '/table',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/table.jsx'))
      })
    }
  },

  'HIGHERORDER',

  {
    path: '/fetch',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/fetch.jsx'))
      })
    }
  },

  'ADDONS',

  {
    path: '/editor',
    getComponent (state, callback) {
      require.ensure([], (require) => {
        callback(null, require('./pages/editor.jsx'))
      })
    }
  }
]
