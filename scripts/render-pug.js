'use strict';
const fs = require('fs');
const path = require('path');
const pug = require('pug');
const prettier = require('prettier');

const srcPath = path.resolve(path.dirname(__filename), '../src');

module.exports = function renderPug(filePath) {

    console.log(`### INFO: Rendering ${filePath}`);
    const html = pug.renderFile(filePath, {
        doctype: 'html',
        filename: filePath,
        basedir: srcPath,
    });

    const prettified = prettier.format(html, {
        printWidth: 1000,
        tabWidth: 4,
        singleQuote: true,
        proseWrap: 'preserve',
        endOfLine: 'lf',
        parser: 'html'
    });

    fs.writeFileSync(filePath.replace(/\.pug$/, '.html'), prettified);

};