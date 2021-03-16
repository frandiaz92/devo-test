const yargs = require('yargs');
const yargsHelper = require('yargs/helpers');
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const files = {};
let countFilesWithTerm = 0;
let totalDocuments = 0;
let idf = 0;

const _getParams = () => yargs(yargsHelper.hideBin(process.argv)).argv;

const _normalize = unnormalizedText => {
  const regexCleanGraveAccentLatinSmallLetter = /[\u0300-\u036f]/g;
  return unnormalizedText
    .toLowerCase()
    .normalize('NFD')
    .replace(regexCleanGraveAccentLatinSmallLetter, '');
};

function _readFilesAndSetTfs(directory, terms) {
  const extension = element => path.extname(element) === '.txt';
  fs.readdirSync(directory)
    .filter(extension)
    .forEach(path => {
      const fileContent = fs.readFileSync(`${directory}/${path}`).toString();
      _calculateTfs(path, fileContent, terms);
    });
}

function _calculateTfs(path, content, terms) {
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

function _calculateIdfs() {
  if (totalDocuments === 0) {
    totalDocuments = Object.keys(files).length;
  }
  idf = Math.log(totalDocuments) / Math.log(countFilesWithTerm);
}

function _setIdf(numReport) {
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

function _calculateIdfsAndShow(numReport) {
  _calculateIdfs();
  const results = _setIdf(numReport);
  _showResults(results);
}

function _initWatcher(directory, terms, numReport, period) {
  const watcher = chokidar.watch(`./${directory}/*.txt`, {
    usePolling: true,
    interval: period,
    ignoreInitial: true
  });
  watcher
    .on('add', path => {
      console.log('\nRecalculating...');
      const content = fs.readFileSync(path).toString();
      _calculateTfs(path.substr(directory.length + 1), content, terms);
      _calculateIdfsAndShow(numReport);
    })
    .on('error', error => {
      console.error('error', error);
    })
    .on('ready', () => {
      console.log('\nWatcher ready!. Listen new files...');
    });
}

function _showResults(results) {
  console.log('\n\nRESULTS: \n');
  results.forEach(result => console.log(result));
}

function init() {
  const { d: directory, n: numReport, p: period, t: term } = _getParams();
  if (!directory || !numReport || !term) {
    console.error(
      'Incorrect terms. You have to enter the required parameters ---> (-d, -n, -t). P.E: node  tfIdf.js -d samples -n 6 -p 3000 -t "la agua el mujer cabello" '
    );
    return;
  }
  const terms = _normalize(term).split(' ');
  _readFilesAndSetTfs(directory, terms);
  _calculateIdfsAndShow(numReport);
  _initWatcher(directory, terms, numReport, period);
}

init();
