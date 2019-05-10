'use strict';

const fsp = require('fs').promises;
const marked = require('marked');

async function readFile(src) {
    return await fsp.readFile(src, { encoding: 'utf-8' });
}

async function writeFile(dest, data) {
    return await fsp.writeFile(dest, data);
}

function tokenize(rawData) {
    return marked.lexer(rawData, { smartypants: true, gfm: true, breaks: true });
}

/*async function testTokens() {
    const rawData = await readFile('008.q012.md');
    //console.log(util.inspect(rawData, false, null));
    const tokens = tokenize(rawData);
    await writeFile('tokens.json', JSON.stringify(tokens));
    console.log('tokens.json written');
}

testTokens();*/

async function testNbsp() {
    const rawData = await readFile('test-nbsp.md');
    const tokens = tokenize(rawData);
    await writeFile('tokens.json', JSON.stringify(tokens));
    console.log('tokens.json written');
    const html = marked.parser(tokens);
    await writeFile('test-nbsp.html', html);
}

testNbsp();
