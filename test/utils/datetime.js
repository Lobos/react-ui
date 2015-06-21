"use strict"

describe('utils datetime', function () {
  var Datetime = require('../../src/js/utils/datetime')
  var eql = Datetime.isEqual
  var eqld = Datetime.isEqualDate

  it('isEqual', function () {
    var d1 = new Date(2015,5,20,20,20,34)
    var d2 = new Date(2015,5,20,20,20,34)
    eql(d1, d2).should.be.true
  })

  it('isEqualDate', function () {
    var d1 = new Date(2015,5,20,20,20,34)
    var d2 = new Date(2015,5,20,20,0,34)
    var d3 = new Date(2015,5,21,20,0,34)
    eqld(d1, d2).should.be.true
    eqld(d2, d3).should.be.false
  })

  it('addDays', function () {
    var d1 = new Date(2015,5,20,20,20,34)
    var d2 = Datetime.addDays(d1, 2)
    eql(d2, new Date(2015,5,22,20,20,34)).should.be.true
    d2 = Datetime.addDays(d1, 11)
    eql(d2, new Date(2015,6,1,20,20,34)).should.be.true
  })

  it('addMonths', function () {
    var d1 = new Date(2015,5,20,20,20,34)
    var d2 = Datetime.addMonths(d1, 1)
    eql(d2, new Date(2015,6,20,20,20,34)).should.be.true
    d2 = Datetime.addMonths(d1, 7)
    eql(d2, new Date(2016,0,20,20,20,34)).should.be.true
    d2 = Datetime.addMonths(d1, -7)
    eql(d2, new Date(2014,10,20,20,20,34)).should.be.true
  })

  it('format', function () {
    var _ = Datetime.format
    var d1 = new Date(2015,5,20,20,20,34)
    _(d1, 'yyyy-MM-dd').should.equal('2015-06-20')
    _(d1, 'yyyy-M-d').should.equal('2015-6-20')
    _(d1, 'yyyy-MM-dd hh:mm:ss').should.equal('2015-06-20 20:20:34')
    _(d1, 'dd/MM/yy').should.equal('20/06/15')
  })

  it('convert', function () {
    var _ = Datetime.convert
    var d1 = new Date(2015,5,20,20,20,34)
    var t = d1.getTime() / 1000
    eql(_(t), d1).should.be.true
    t = t.toString()
    eql(_(t), d1).should.be.true
  })
})
