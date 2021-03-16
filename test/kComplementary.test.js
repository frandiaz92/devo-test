const assert = require('assert');
const kComplementary = require('../src/utils/isKComplementary');

describe('Testing kComplementary module:', () => {
  it('This array has kComplementary:', () => {
    const result = kComplementary([1,2,3,4,5,6,7], 7);
    assert.equal(6, result);
 });
  it('Array with equals number has kComplementary', () => {
    const result = kComplementary([3,3,4,4,6,7], 7);
    assert.equal(8, result);
  });
 it('Array without kComplementary:', () => {
  const result = kComplementary([3,3,4,4,6,7], 15);
  assert.equal(0, result);
 });
});