const isPalindrome = function(str = '') {
  if (!str || typeof str !== 'string') {
    return false;
  }
  return str === [...str].reverse().join('');
};

module.exports = isPalindrome;
