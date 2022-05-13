var assert = require('assert');

describe('계산기 테스트', function () {
  it('1+1은 2를 반환해라', function (done) {
    assert.equal(1 + 1, 2);
    done();
  });

  it('2*2 는 4를 반환해라', function (done) {
    assert.equal(2 * 2, 4);
    done();
  });
});
