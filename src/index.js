const vscode = require('vscode');
const dictionnary = require('./headerFunctions').extCategory;

/**
 * Main module function
 */
function activate() {
    console.log('"vscode-fileheader" is now active!');

    // Event in VSCode when a tab is open
    vscode.window.onDidChangeActiveTextEditor(function (event) {
        if (typeof event === 'undefined') {
            return;
        }

        const editor = vscode.editor || vscode.window.activeTextEditor;
        const document = editor.document;
        const language = document.languageId;
        dictionnary[language](document.fileName);
    });

}

exports.activate = activate;

/**
 * Function for perform and cleanup tasks when VS Code shutdown
 */
function deactivate() { }

exports.deactivate = deactivate;
