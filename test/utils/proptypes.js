import { expect } from 'chai';
import PropTypes from '../../src/utils/proptypes';

describe('proptypes', function () {
  it('custom PropTypes', function () {
    (PropTypes.string_number === undefined).should.be.ok;
    (typeof PropTypes.number_string === 'function').should.be.ok;
    (typeof PropTypes.func_number_string === 'function').should.be.ok;
    (typeof PropTypes.element_func_string === 'function').should.be.ok;
  });
});
