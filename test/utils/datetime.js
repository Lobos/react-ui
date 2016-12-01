"use strict";

import * as Datetime from '../../src/utils/datetime';

describe('utils datetime', function () {
  let eql = Datetime.isEqual;
  let eqld = Datetime.isEqualDate;

  it('isEqual', function () {
    let d1 = new Date(2015,5,20,20,20,34);
    let d2 = new Date(2015,5,20,20,20,34);
    eql(d1, d2).should.be.true;
    eql(d2, new Date(2015,5,20,20,20,35)).should.be.false;
    eql(d2, null).should.be.false;
  });

  it('isEqualDate', function () {
    let d1 = new Date(2015,5,20,20,20,34);
    let d2 = new Date(2015,5,20,20,0,34);
    let d3 = new Date(2015,5,21,20,0,34);
    eqld(d1, d2).should.be.true;
    eqld(d2, d3).should.be.false;
    eqld(d2, null).should.be.false;
  });

  it('addDays', function () {
    let d1 = new Date(2015,5,20,20,20,34);
    let d2 = Datetime.addDays(d1, 2);
    eql(d2, new Date(2015,5,22,20,20,34)).should.be.true;
    d2 = Datetime.addDays(d1, 11);
    eql(d2, new Date(2015,6,1,20,20,34)).should.be.true;
  });

  it('addMonths', function () {
    let d1 = new Date(2015,5,20,20,20,34);
    let d2 = Datetime.addMonths(d1, 1);
    eql(d2, new Date(2015,6,20,20,20,34)).should.be.true;
    d2 = Datetime.addMonths(d1, 7);
    eql(d2, new Date(2016,0,20,20,20,34)).should.be.true;
    d2 = Datetime.addMonths(d1, -7);
    eql(d2, new Date(2014,10,20,20,20,34)).should.be.true;
  });

  it('format', function () {
    let _ = Datetime.format;
    let d1 = new Date(2015,5,20,20,20,34);
    _(d1, 'yyyy-MM-dd').should.equal('2015-06-20');
    _(d1, 'yyyy-M-d').should.equal('2015-6-20');
    _(d1, 'yyyy-MM-dd hh:mm:ss').should.equal('2015-06-20 20:20:34');
    _(d1, 'dd/MM/yy').should.equal('20/06/15');
    _(null).should.equal('');
    _('2015-6-20', 'dd/MM/yy').should.equal('20/06/15');
    _('2015-6-20', 'dd/MM').should.equal('20/06');
  });

  it('convert', function () {
    let _ = Datetime.convert;
    let d1 = new Date(2015,5,20,20,20,34);
    let t = d1.getTime();
    eql(_(t), d1).should.be.true;
    t = t.toString();
    eql(_(t), d1).should.be.true;

    should.not.exist(_())
    should.not.exist(_('hehehe'))

    eql(_(null, d1), d1).should.be.true;
    eql(_(d1), d1).should.be.true;
    eqld(_('2015-6-20'), new Date(2015, 5, 20)).should.be.true;
  });

  it('getFirstDayOfMonth', () => {
    let d = new Date(2015,5,20,20,20,34);
    eqld(Datetime.getFirstDayOfMonth(d), new Date(2015,5,1)).should.be.true;
  });

  it('getDaysInMonth', () => {
    let d = new Date(2015,5,20,20,20,34);
    Datetime.getDaysInMonth(d).should.equal(30);
  });

  it('getFullMonth', () => {
    let d = new Date(2015,5,20,20,20,34);
    Datetime.getFullMonth(d).should.equal('六月');
  });

  it('getShortMonth', () => {
    let d = new Date(2015,5,20,20,20,34);
    Datetime.getShortMonth(d).should.equal('六');
  });

  it('getDayOfWeek', () => {
    let d = new Date(2015,5,20,20,20,34);
    Datetime.getDayOfWeek(d).should.equal('六');
  });

  it('getDatetime', () => {
    let d = new Date(2015,5,20,20,20,34);
    Datetime.getDatetime(d).should.equal('2015-06-20 20:20:34');
  });

  it('getDate', () => {
    let d = new Date(2015,5,20,20,20,34);
    Datetime.getDate(d).should.equal('2015-06-20');
  });

  it('getTime', () => {
    let d = new Date(2015,5,20,20,20,34);
    Datetime.getTime(d).should.equal('20:20:34');
  });

  it('getFullYear', () => {
    let d = new Date(2015,5,20,20,20,34);
    Datetime.getFullYear(d).should.equal('2015年');
  });

  it('getWeekArray', () => {
    let d = new Date(2015,5,20,20,20,34);
    Datetime.getWeekArray(d).length.should.eql(5);
  });

  it('monthDiff', () => {
    let d = new Date(2015,5,20,20,20,34);
    let d2 = new Date(2013,5,20,20,20,34);
    Datetime.monthDiff(d, d2).should.eql(24);
  });

});
