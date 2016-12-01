import md5 from 'blueimp-md5'

export function hashClassNameTest(wrapper, baseClassName, ok) {
  const className = wrapper.prop('className')
  const reg = new RegExp(`.*${baseClassName}.*`)
  const assert = expect(reg.test(className))
  ok ? assert.to.be.ok : assert.to.not.be.ok
}

export function gridClassName(className) {
  return 's_' + md5(className).substr(24)
}
