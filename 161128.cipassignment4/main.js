const fs = require('fs');
const express = require('express');
const iconv = require('iconv-lite');
const url = require('url');
const opener = require('opener');
const getPath = (...names) => names.join('/');

const PRON_FILES_PATH = getPath('.', 'pronunciation');
const PRON_MAP_FILE_PATH = getPath('.', 'fileMap.txt');

const pronLib = function () {
    let audioMap = {};
    let pronMap = {};
    return {
        addAudioBlob: (pron, buffer) => audioMap[pron] = buffer,
        addPron: (char, pron) => pronMap[char] ? pronMap[char].push(pron) : pronMap[char] = [pron],
        getAudioBlob: (char, pron) => pron ? audioMap[pron] : audioMap[pronMap[char][0]],
    }
}();
const init = function () {
    fs.readdirSync(PRON_FILES_PATH)
        .forEach(fn => pronLib.addAudioBlob(fn.split('.').shift(), fs.readFileSync(getPath(PRON_FILES_PATH, fn))));
    iconv.decode(fs.readFileSync(PRON_MAP_FILE_PATH), 'gbk')
        .replace(/\r/g, '\n').replace(/\n\n/g, '\n').split('\n')
        .filter(line => !line.includes('5'))
        .map(line => line.split(' '))
        .filter(arr => arr.length > 1)
        .map(arr => ({pron: arr[0], chars: arr[1].split('')}))
        .forEach(obj => obj.chars.forEach(char => pronLib.addPron(char, obj.pron)));
};
const pronHandler = function (req, res) {
    let char = req.query['char'];
    if (char && char.length) {
        char = char[0];
        let blob = pronLib.getAudioBlob(char);
        if (blob) {
            res.status(200);
            res.set('Content-Type', 'audio/mp3');
            res.send(blob);
        } else {
            res.status(400).send('Pronunciation not found!');
        }
    } else {
        res.writeHead(400);
    }
    res.end();
};

init();
let app = express();
app.use(express.static('static'));
app.get('/pron', pronHandler);
app.listen(3000);
opener('http://localhost:3000/');
