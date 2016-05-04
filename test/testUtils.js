export function hashClassNameTest(wrapper, baseClassName, ok) {
  const className = wrapper.prop('className')
  const reg = new RegExp(`.*${baseClassName}-[\\w-]{5}.*`)
  const assert = expect(reg.test(className))
  ok ? assert.to.be.ok : assert.to.not.be.ok
}
