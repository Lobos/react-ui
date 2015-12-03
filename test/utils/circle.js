'use strict';

import { getPositions } from '../../src/utils/circle';
import isEqual from '../../src/utils/isEqual';

describe('utils circle', () => {
  it('circle', () => {
    let pos = getPositions(12);
    let pos1 = [ [ '100.00', '50.00' ],
      [ '93.30', '75.00' ],
      [ '75.00', '93.30' ],
      [ '50.00', '100.00' ],
      [ '25.00', '93.30' ],
      [ '6.70', '75.00' ],
      [ '0.00', '50.00' ],
      [ '6.70', '25.00' ],
      [ '25.00', '6.70' ],
      [ '50.00', '0.00' ],
      [ '75.00', '6.70' ],
      [ '93.30', '25.00' ] ];
    isEqual(pos, pos1).should.be.true;

    pos = getPositions(6, 100, 90, 0, 0);
    pos1 = [ [ '0.00', '100.00' ],
      [ '-86.60', '50.00' ],
      [ '-86.60', '-50.00' ],
      [ '-0.00', '-100.00' ],
      [ '86.60', '-50.00' ],
      [ '86.60', '50.00' ] ];
    isEqual(pos, pos1).should.be.true;
  });
});
