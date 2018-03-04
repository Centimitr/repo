const iconv = require('iconv-lite');
const fs = require('fs-extra');
const getPath = (...names) => names.join('/');
const readLines = (path, encoding) => iconv.decode(new Buffer(fs.readFileSync(path)), encoding).replace(/\r/g, '\n').replace(/\n\n/g, '\n').split('\n');
const writeLines = (path, encoding, lines) => {
    fs.ensureFileSync(path);
    fs.writeFileSync(path, iconv.encode(lines.join('\r\n'), encoding));
};

const INPUT = 'zi_unicode.txt';
const ENCODING = 'utf16-le';
const OUTPUT = 'zimb.txt';

const generateZimb = (lines) => {
    let map = {};
    lines.map(line => ({character:line.split('').pop(),pinyin:line.split('').slice(0,-1).join('')}))
        .forEach(obj => {
            if (map[obj.pinyin]){
                map[obj.pinyin].push(obj.character);
            }else{
                map[obj.pinyin] = [obj.character];
            }
        });
    let zimb = [];
    for(let pinyin in map){
        zimb.push(pinyin+map[pinyin].join(''))
    }
    return zimb;
};

let lines = readLines(getPath('.', INPUT), ENCODING);
let output = generateZimb(lines);
writeLines(getPath('.', OUTPUT), ENCODING, output);
