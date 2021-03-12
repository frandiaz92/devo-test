const assert = require('assert');
const p = require('../palindrome');
const kComplementary = require('../kComplementary');
describe('Testing palindorme module', () => {
  it('Is palindrome', () => {
    const result = p.isPalindrome('ana');
    assert.equal(true, result);
  });
  it('Is not palindrome', () => {
    const result = p.isPalindrome('ani');
    assert.equal(false, result);
  });
});

describe('Testing kComplementary module:', () => {
  it('This array has kComplementary:', () => {
    const result = kComplementary.default([1,2,3,4,5,6,7], 7);
    assert.equal(6, result);
 });
  it('Array with equals number has kComplementary', () => {
    const result = kComplementary.default([3,3,4,4,6,7], 7);
    assert.equal(8, result);
  });
 it('Array without kComplementary:', () => {
  const result = kComplementary.default([3,3,4,4,6,7], 15);
  assert.equal(0, result);
 });
});