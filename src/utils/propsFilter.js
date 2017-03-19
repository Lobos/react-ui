import { objectAssign } from './objects'

function filter (args, keys) {
  let props = args.reduce((p, c) => objectAssign(p, c))
  keys.forEach(key => delete props[key])

  return props
}

export function filterInputProps () {
  return filter(
    [...arguments],
    ['onValidate', 'dispatch', 'ignore', 'tip', 'validator', 'hasError', 'trigger', 'sep']
  )
}

export function filterTextareaProps () {
  return filter(
    [...arguments],
    ['onValidate', 'sep', 'hasError', 'trigger', 'tip', 'validator', 'hasError', 'trigger']
  )
}

export function filterFormProps () {
  return filter(
    [...arguments],
    ['onCancel', 'fetchStatus', 'fetch', 'columns', 'labelWidth', 'onChange', 'initValidate']
  )
}
