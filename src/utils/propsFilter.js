export function filterInputProps (...props) {
  const temp = props.reduce((p, c) => {
    return Object.assign(p, c)
  })

  const {indeterminate, hasError, trigger, sep, ...others} = temp

  return others
}
