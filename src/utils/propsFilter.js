export function merge(...props){
  return props.reduce((p, c) => {
    return Object.assign(p, c)
  })
}

export function filterInputProps (...props) {
  const {onValidate, dispatch, ignore, tip, validator, hasError, trigger, sep, ...others} = merge(...props)

  return others
}

export function filterTextareaProps(...props) {
  const {onValidate, sep, hasError, trigger, ...others} = merge(...props)

  return others
}

export function filterFormProps(...props) {
  const {fetchStatus, fetch, columns, labelWidth, ...others} = merge(...props)

  return others
}
