describe('utils strings', function () {
  var Strings = ReactUI.Utils.Strings

  it('string format', function () {
    str = '{0}-{1}!={2}'
    var c = Strings.format(str, '3', '4', 2)
    c.should.eql('3-4!=2')
  })

  it('string substitute', function () {
    var obj = { a:1, b:2 },
    str = '{a}!={b}'

    var c = Strings.substitute(str, obj)
    c.should.eql('1!=2')
  })

  it('toArray', function () {
    var _ = Strings.toArray
    var raw = '1,2,3'
    expect(_(raw, ',')).to.deep.equal(['1', '2', '3'])

    raw = '1,2,3'
    expect(_(raw)).to.deep.equal(['1,2,3'])

    raw = [1, 2, 3]
    expect(_(raw, ',')).to.deep.equal(['1', '2', '3'])

    raw = [1, 2, 3]
    expect(_(raw)).to.deep.equal([1, 2, 3])
  })
})
