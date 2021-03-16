const assert = require('assert');
const isPalindrome = require('../src/utils/isPalindrome');
describe('Testing palindorme module', () => {
  it('Is palindrome', () => {
    const result = isPalindrome('ana');
    assert.equal(true, result);
  });
  it('Is not palindrome', () => {
    const result = isPalindrome('ani');
    assert.equal(false, result);
  });
});