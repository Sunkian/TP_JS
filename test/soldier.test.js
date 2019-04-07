const {Soldier} = require('../soldier');

require('chai').should();

describe('soldier.js', () => {
  describe('#starve()', () => {
    it('shouldnt starve because the soldier is young', () => {
      const soldier = new Soldier();
      soldier.starve();
      soldier.isAlive.should.be.equal(true);
    });

    it('should starve because the soldier is too old', () => {
      const soldier = new Soldier();
      soldier.age = 70;
      soldier.starve();
      soldier.isAlive.should.be.equal(false);
    });
  });
});
