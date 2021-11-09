import { assert } from 'chai';
import { Util } from '..';

describe('Util', () => {
  describe('jail', () => {
    it('jails', () => {
      const actual = Util.jail('foo/bar', '/', false);
      assert.equal('/foo/bar', actual);
    });
  });
});
