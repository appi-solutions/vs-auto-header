const vscode = require('vscode');
const fs = require('fs');
const templates = require('./headerFunctions');
const moment = require('moment');

/**
 * Read and split the file line by line
 * @param {File} fileName file
 * @param {TextEncoder} type utf8
 */
exports.parseHeader = (fileName, type) => {
    return new Promise((resolve, reject) =>
        fs.readFile(fileName, type, (err, data) => {
            const lines = data.split(' ');
            if (err) {
                return reject(err);
            }
            resolve(lines);
        })
    );
};

/**
 * Replace the header if the value in the input box is 'Y'
 * @param {string} lines split lines off from file
 * @param {string} symbol symbol of file extension for the header
 * @param {string} config configuration's user
 */
function replaceHeader(lines, symbol, config) {
    return new Promise((resolve, reject) => {
        const editor = vscode.editor || vscode.window.activeTextEditor;
        symbol.split(' ');
        const document = editor.document;
        const lineCount = document.lineCount;
        for (let x = 0; x < lineCount; x++) {
            if (lines[x] === '@Author:') {
                return reject();
            }
        }

        const res = vscode.InputBoxOptions = {
            prompt: 'Do you want an header in this file ?',
            placeHolder: 'Y/n'
        };

        vscode.window.showInputBox(res).then(value => {
            if (value === undefined) {
                return;
            } else if (value === 'Y' || !value) {
                // Creating the header
                editor.edit(function (editBuilder) {
                    const time = moment().format('YYYY-MM-DD h:mm:ss a');
                    const data = {
                        author: config.Author,
                        email: config.Email,
                        lastModifiedBy: config.LastModifiedBy,
                        createTime: time,
                        updateTime: time
                    };
                    try {
                        templates.templates[symbol](editBuilder, data);
                    } catch (error) {
                        reject(error);
                    }
                });

                vscode.workspace.saveAll(true);
                resolve(lines);
            }
            return;
        });
    });
}

exports.replaceHeader = replaceHeader;