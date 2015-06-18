var expect = require('chai').expect

describe('lang', function () {
  var Lang = require('../../src/js/lang')

  it('set / get', function () {
    require('../../src/js/lang/zh-cn')

    var _ = Lang.get
    _('request.status.400').should.equal('非法请求')
    _('date.format.year').should.equal('yyyy年')
    expect(_('data.format.tt')).to.be.undefined
  })
})
