const vscode = require('vscode');
const { parseHeader, replaceHeader } = require('./helpers');

exports.extCategory = {
  'javascript': readHeader(' * '),
  'cpp': readHeader(' * '),
  'c': readHeader(' * '),
  'csharp': readHeader(' * '),
  'css': readHeader(' * '),
  'go': readHeader(' * '),
  'groovy': readHeader(' * '),
  'java': readHeader(' * '),
  'less': readHeader(' * '),
  'objectiv-c': readHeader(' * '),
  'objectiv-cpp': readHeader(' * '),
  'razor': readHeader(' * '),
  'scss': readHeader(' * '),
  'sql': readHeader(' * '),
  'swift': readHeader(' * '),
  'typescript': readHeader(' * '),
  'makefile': readHeader('# '),
  'dockerfile': readHeader('# '),
  'coffeescript': readHeader('# '),
  'yaml': readHeader('# '),
  'html': readHeader('<!--'),
  'jade': readHeader('<!--'),
  'xml': readHeader('<!--')
};

exports.templates = {
  ' * ': popHeader('star'),
  '# ': popHeader('hashtag'),
  '<!--': popHeader('html')
};

const settings = {
  star: '/**\r\n * @author {author} <{email}>\r\n * @file Description\r\n * @desc Created on {createTime}\r\n * @copyright APPI SASU\r\n */\r\n',
  hashtag: '##\r\n# @author {author} <{email}>\r\n # @file Description\r\n # @desc Created on {createTime}\r\n # @copyright APPI SASU\r\n #\r\n',
  html: '<!--\r\n @author {author} <{email}>\r\n @file Description\r\n @desc Created on {createTime}\r\n @copyright APPI SASU\r\n -->\r\n'
};

/**
 * Generates header
 * @param {string} templateName template's name
 */
function popHeader(templateName) {
  return ((editBuilder, data) => {
    const symbol = new template(settings[templateName]).render(data);
    editBuilder.insert(new vscode.Position(0, 0), symbol);
  });
}

/**
 * Read the header inside the file
 * @param {string} symbol comment character
 * @param {string} start beginner character
 * @param {string} end end character
 */
function readHeader(symbol) {
  return ((filename) => {
    const config = vscode.workspace.getConfiguration('fileheader');
    parseHeader(filename, 'utf8')
      .then(lines => replaceHeader(lines, symbol, config))
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  });
}

/**
 * Loop to push lines in the header
 * @param {string} tpl template configuration
 * @param {Array} code replace the header
 */
function pushLoop(tpl, code) {
  let match;
  let re = /\{\s*([a-zA-Z._0-9()]+)(\s*\|\s*safe)?\s*\}/m,
    addLine = function (text) {
      code.push('r.push(\'' + text.replace(/'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\');');
    };
  while ((match = re.exec(tpl)) !== null) {
    if (match.index > 0) {
      addLine(tpl.slice(0, match.index));
    }
    if (match[2]) {
      code.push('r.push(String(this.' + match[1] + '));');
    } else {
      code.push('r.push(_html(String(this.' + match[1] + ')));');
    }
    tpl = tpl.substring(match.index + match[0].length);
  }
  addLine(tpl);
}

/**
 * Push the header template
 * @param {string} tpl template configuration
 */
function template(tpl) {
  let fn;
  let code = [
    'let r=[];',
    'const _html = function (str) {',
    'return str.replace(/&/g, \'&amp;\').replace(/"/g, \'&quot;\').replace(/\'/g, \'&#39;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\');',
    '};'
  ];
  pushLoop(tpl, code);
  code.push('return r.join(\'\');');
  fn = new Function(code.join('\n'));
  this.render = function (model) {
    return fn.apply(model);
  };
}

exports.template = template;