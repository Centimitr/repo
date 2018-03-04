const iconv = require('iconv-lite');
const fs = require('fs-extra');
const pyEncode = require('./pyEncode');
const getPath = (...names) => names.join('/');
const readLines = (path, encoding) => iconv.decode(new Buffer(fs.readFileSync(path)), encoding).replace(/\r/g, '\n').replace(/\n\n/g, '\n').split('\n');

const INPUT = 'zimb.txt';
const ENCODING = 'utf16-le';
const OUTPUT = 'zimb.idx';

const nrLen = iconv.encode('\n\r', ENCODING).length * 8;
let offset = 0;
let idx = readLines(getPath('.', INPUT), ENCODING)
    .map(line => ({pinyin: /^[A-Za-z]+/.exec(line)[0], bytes: iconv.encode(line, ENCODING).length * 8}))
    .map(obj => {
        const buf = Buffer.alloc(4);
        const offset16 = Uint16Array.from([offset]);
        buf.set(pyEncode(obj.pinyin), 0);
        buf.set(Buffer.from(offset16.buffer), 2);
        offset += obj.bytes + nrLen;
        return buf;
    });

let data = Buffer.concat(idx, idx.length * 4);
fs.writeFileSync(getPath('.', OUTPUT), data);