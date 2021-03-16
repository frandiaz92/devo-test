const yargs = require('yargs');
const yargsHelper = require('yargs/helpers');
const kComplementary = require('./utils/isKComplementary');

function getParams() {
  return yargs(yargsHelper.hideBin(process.argv))
    .option('a', {
      type: 'array',
      desc: 'array of integers'
    })
    .option('k', {
      type: 'number',
      desc: 'k number'
    }).argv;
}

function init() {
  const { a: arr, k } = getParams();
  if (!Array.isArray(arr) || k === undefined) {
    console.error(
      'Incorrect terms. You have to enter the required parameters ---> -a y -k. P.E: node indexKComplementary.js -a 1 2 3 4 5 6 7 -k 7'
    );
    return;
  }
  console.log(
    `Total counts k-complementary: ${kComplementary(arr, k)}`
  );
}
init();