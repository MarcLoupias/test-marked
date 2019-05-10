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

    function codeFn(code, language) {
        return `<pre><code class="language-${language}">${code}</code></pre>` + '\n';
    }

    function textFn(text) {
        //return text.replace(/\u00A0/g, '');
        //return text.replace(/je/g, 'tu');
        return text;
    }

    const markedRendererOverwrite = {
        code: codeFn,
        text: textFn
    };

    const markedRenderer = Object.assign(
        new marked.Renderer(),
        { ...markedRendererOverwrite }
    );

    const markedOptions = {
        renderer: markedRenderer,
        langPrefix: '',
        smartypants: true,
        gfm: true,
        breaks: true
    };

    const html = marked.parser(tokens, markedOptions);
    await writeFile('test-nbsp.html', html);
}

testNbsp();
