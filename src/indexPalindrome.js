const yargs = require('yargs');
const yargsHelper = require('yargs/helpers');
const isPalindrome = require('./utils/isPalindrome');

function getParams() {
  return yargs(yargsHelper.hideBin(process.argv)).option('s', {
    type: 'string',
    desc: 'string to check if this string is a palidrome'
  }).argv;
}

function init() {
  const { s: str } = getParams();
  if (!str) {
    console.error(
      'Incorrect terms. You have to enter the required parameters --->  -s. P.E: node indexPalindrome.js -s "ana"'
    );
  }
  isPalindrome(str)
    ? console.log(`"${str}" is a palindrome`)
    : console.log(`"${str}" in not a palindrome`);
}
init();