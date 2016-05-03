const compData = {}

const compClass = {
  info: 'rct-button-info',
  primary: 'rct-button-primary',
  success: 'rct-button-success',
  error: 'rct-button-error',
  warning: 'rct-button-warning'
}

const compRegex = {
  default: /.*button-[\w-]{5}.*/,
  info: /.*info-[\w-]{5}.*/,
  primary: /.*primary-[\w-]{5}.*/,
  success: /.*success-[\w-]{5}.*/,
  error: /.*error-[\w-]{5}.*/,
  danger: /.*danger-[\w-]{5}.*/,
  warning: /.*warning-[\w-]{5}.*/,
  link: /.*link-[\w-]{5}.*/,
  secondary: /.*secondary-[\w-]{5}.*/,
}

const compSelector = {}

export { compClass, compData, compRegex, compSelector }
