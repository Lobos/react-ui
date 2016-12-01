import { getLang, setLang } from '../../../src/lang'

describe('LangSpec', () => {
  before(() => {
    setLang('buttons')
  })

  it('should get correct value by key', () => {
    const value = getLang('buttons.ok')

    expect(value).to.equal('确定')
  })
})
