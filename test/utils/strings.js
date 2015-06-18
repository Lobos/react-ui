var Strings = require('../../src/js/utils/strings')

describe('utils strings', function () {

  it('string format', function () {
    var _ = Strings.format
    var str = '{0}-{1}!={2}'
    _(str, '3', '4', 2).should.equal('3-4!=2')
  })

  it('string substitute', function () {
    Strings.substitute('{a}!={b}', { a:1, b:2 }).should.equal('1!=2')
  })

  it('toArray', function () {
    var _ = Strings.toArray
    var raw = '1,2,3'
    _(raw, ',').should.deep.equal(['1', '2', '3'])

    raw = '1,2,3'
    _(raw).should.deep.equal(['1,2,3'])

    raw = [1, 2, 3]
    _(raw, ',').should.deep.equal(['1', '2', '3'])

    raw = [1, 2, 3]
    _(raw).should.deep.equal([1, 2, 3])
  })
})
