const iconv = require('iconv-lite');
const fs = require('fs-extra');
const getPath = (...names) => names.join('/');
const readLines = (path, encoding) => iconv.decode(new Buffer(fs.readFileSync(path)), encoding).replace(/\r/g, '\n').replace(/\n\n/g, '\n').split('\n');

const INPUT = 'zimb.txt';
const INPUT_IDX = 'zimb.idx';
const ENCODING = 'utf16-le';

const srm2hzbyindex = srm => {
// get offset with srm from INPUT_IDX
// open file with seek to the specific line
// read line
// get hz
};

module.exports = srm2hzbyindex;