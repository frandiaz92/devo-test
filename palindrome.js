
export function isPalindrome (str = ''){
  if(!str || typeof(str) !== 'string'){
    return false;
  }
  return str === [...str].reverse().join('');
}