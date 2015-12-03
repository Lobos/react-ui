import { expect } from 'chai';
import { getLang, setLang, setLocation } from '../../src/lang';

describe('lang', function () {
  it('set / get', function () {
    setLocation('zh-cn');

    setLang({}, undefined, null);
    setLang('datetime');

    getLang().datetime.format.year.should.equal('yyyy年');

    getLang('datetime.format.year').should.equal('yyyy年');
    expect(getLang('datetime.format.tt')).to.be.undefined;
    getLang('datetime.format.tt', 'none').should.equal('none');

    setLang('buttons');
    getLang('buttons.add').should.equal('新建');

    expect(getLang(null)).to.be.undefined;
  });
});
