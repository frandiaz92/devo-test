const yargs = require('yargs');
const yargsHelper = require('yargs/helpers');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const files = {};
let countFilesWithTerm = 0;
let totalDocuments = 0;
let idf = 0;

function _normalize(unnormalizedText) {
  const regexCleanGraveAccentLatinSmallLetter = /[\u0300-\u036f]/g;
  return unnormalizedText
    .toLowerCase()
    .normalize('NFD')
    .replace(regexCleanGraveAccentLatinSmallLetter, '');
}

function getParams() {
  return yargs(yargsHelper.hideBin(process.argv)).argv;
}

function initWatcherIntoDirectory(directory, terms, numReport, period) {
  const watcher = chokidar.watch(`./${directory}/*.txt`, {
    usePolling: true,
    interval: period,
    ignoreInitial: true
  });
  watcher
    .on('add', path => {
      console.log('\nRecalculating...');
      const content = fs.readFileSync(path).toString();
      calculateTfs(path.substr(directory.length + 1), content, terms);
      calculateIdfs();
      const results = setIdf(numReport);
      showResults(results);
    })
    .on('error', error => {
      console.error('error', error);
    })
    .on('ready', () => {
      console.log('\nWatcher ready!. Listen new files...');
    });
}

function init() {
  const { d: directory, n: numReport, p: period, t: term } = getParams();
  if (!directory || !numReport || !term) {
    console.error(
      'Incorrect terms. You have to enter the required parameters ---> (-d, -n, -t). P.E: node  tfIdf.js -d samples -n 6 -p 3000 -t "la agua el mujer cabello" '
    );
    return;
  }
  const terms = _normalize(term).split(' ');
  readFiles(directory, terms);
  calculateIdfs();
  const results = setIdf(numReport);
  showResults(results);
  initWatcherIntoDirectory(directory, terms, numReport, period);
}

const extension = element => path.extname(element) === '.txt';

function readFiles(directory, terms) {
  fs.readdirSync(directory)
    .filter(extension)
    .forEach(path => {
      const fileContent = fs.readFileSync(`${directory}/${path}`).toString();
      calculateTfs(path, fileContent, terms);
    });
}

function calculateTfs(path, content, terms) {
  const countTotalWords = _normalize(content).split(/\s+/).length;
  if (countTotalWords > 0) {
    const numTermsAppears = terms.reduce((acc, val) => {
      const findTermRegex = new RegExp(val, 'g');
      const termsAppears = content.match(findTermRegex);
      return termsAppears ? acc + termsAppears.length : acc;
    }, 0);

    if (numTermsAppears > 0) {
      countFilesWithTerm++;
    }
    files[path] = {
      tf: numTermsAppears / countTotalWords,
      score: 0
    };
  } else {
    files[path] = {
      tf: 0,
      score: 0
    };
  }
}
function calculateIdfs() {
  if (totalDocuments === 0) {
    totalDocuments = Object.keys(files).length;
  }
  idf = Math.log(totalDocuments) / Math.log(countFilesWithTerm);
}

function setIdf(numReport) {
  return Object.entries(files)
    .map(file => {
      const key = file[0];
      const score = files[key].tf * idf;
      files[key].score = score;
      return [key, score];
    })
    .sort((a, b) => b[1] - a[1])
    .map(el => `${el[0]}: ${el[1]}`)
    .slice(0, numReport);
}
function showResults(results) {
  console.log('\n\nRESULTS: \n');
  results.forEach(result => console.log(result));
}

init();
