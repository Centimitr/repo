const iconv = require('iconv-lite');
const fs = require('fs-extra');
const getPath = (...names) => names.join('/');
const readLines = (path, encoding) => iconv.decode(new Buffer(fs.readFileSync(path)), encoding).replace(/\r/g, '\n').replace(/\n\n/g, '\n').split('\n');
const writeLines = (path, encoding, lines) => {
    fs.ensureFileSync(path);
    fs.writeFileSync(path, iconv.encode(lines.join('\r\n'), encoding));
};

const INPUT_UNICODE = 'zici_unicode.txt';
const OUTPUT_UNICODE = 'zi_unicode.txt';
const INPUT_GBK = 'zici.txt';
const OUTPUT_GBK = 'zi.txt';

const generateZi = lines => lines
    .filter(line => line.split('').filter(c => (!c.match(/^[A-Za-z]+$/) && !c.match(' '))).length === 1)
    .map(line => ({character: line.split('')[0], pinyins: line.split('').slice(1).join('').split(' ')}))
    .map(single => single.pinyins.map(pinyin => pinyin + single.character))
    .reduce((a,b)=>a.concat(b));

// default config
let ENCODING = 'utf16-le';
let INPUT = INPUT_UNICODE;
let OUTPUT = OUTPUT_UNICODE;

let task = (target) => {
    switch (target.toLowerCase()) {
        case 'unicode':
            ENCODING = 'utf16-le';
            INPUT = INPUT_UNICODE;
            OUTPUT = OUTPUT_UNICODE;
            break;
        case 'ansi':
            ENCODING = 'gbk';
            INPUT = INPUT_GBK;
            OUTPUT = OUTPUT_GBK;
            break;
    }
    let lines = readLines(getPath('.', INPUT), ENCODING);
    let output = generateZi(lines);
    writeLines(getPath('.', OUTPUT), ENCODING, output);
};

task('ANSI');
task('Unicode');
