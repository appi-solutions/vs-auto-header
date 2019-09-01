/**
 * @author Guillaume Robin <guillaume.robin@appi-conseil.com>
 * @file Description
 * @desc Created on 2018-12-03 10:36:24 am
 * @copyright APPI SASU
 */
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
      if (err) {
        return reject(err);
      }
      const lines = data.match(/[^\r\n]+/g);
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
    for (let x = 0; x < lines.length; x++) {
      const res = lines[x].match(/[ *#]+@author/g);
      if (res !== null) {
        return reject();
      }
    }

    const res = (vscode.InputBoxOptions = {
      prompt: 'Do you want an header in this file ?',
      placeHolder: 'Y/n'
    });

    vscode.window.showInputBox(res).then(value => {
      if (value === undefined) {
        return;
      } else if (value === 'Y' || !value) {
        editor.edit(function(editBuilder) {
          const time = moment().format('YYYY-MM-DD h:mm:ss a');
          const data = {
            copyrights: config.Copyrights,
            author: config.Author,
            email: config.Email,
            lastModifiedBy: config.Author,
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
