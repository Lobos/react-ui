const compData = {
  _foo: {
    type: 'info',
    content: 'foo'
  },
  _bar: {
    type: 'info',
    content: 'foo'
  },
  _baz: {
    type: 'error',
    content: 'foo'
  }
}

const compClass = {
  info: 'rct-message-info',
  primary: 'rct-message-primary',
  success: 'rct-message-success',
  error: 'rct-message-error',
  warning: 'rct-message-warning',
  messageContainer: 'rct-message-container',
  messageItem: 'rct-message'
}

const compSelector = {
  info: '.rct-message-info',
  primary: '.rct-message-primary',
  success: '.rct-message-success',
  error: '.rct-message-error',
  warning: '.rct-message-warning',
  messageItem: '.rct-message'
}

export { compClass, compData, compSelector }
