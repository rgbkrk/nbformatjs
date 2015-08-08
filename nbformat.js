var Ajv = require('ajv');
var v3Schema = require('./v3/nbformat.v3.schema.json');
var v4Schema = require('./v4/nbformat.v4.schema.json');

function NotebookValidator() {
    Ajv.call(this);
    this.addSchema(v3Schema, '/v3');
    this.addSchema(v4Schema, '/v4');
}
NotebookValidator.prototype = Object.create(Ajv.prototype);


/**
 * Validates a notebook
 * @param  {Object} notebook Notebook object to validate
 * @return {bool}            Validity
 */
NotebookValidator.prototype.validateNotebook = function (notebook) {
    return this.validate('/v' + notebook.nbformat, notebook);
};

/**
NotebookValidator = require('./nbformat');
nbv = new NotebookValidator();

var fs = require('fs');
var nb = "tests/test4.ipynb";
var nbModel = JSON.parse(fs.readFileSync(nb, 'utf8'));

> nbv.validateNotebook(JSON.parse(fs.readFileSync("tests/test2.ipynb", 'utf8'))); nbv.errorsText()
Error: no schema with key or ref "/v2"
    at Ajv.validate (/Users/kyle6475/code/nbformatjs/node_modules/ajv/lib/ajv.js:60:27)
    at Ajv.NotebookValidator.validateNotebook (/Users/kyle6475/code/nbformatjs/nbformat.js:19:17)
    at repl:1:5
    at REPLServer.defaultEval (repl.js:164:27)
    at bound (domain.js:250:14)
    at REPLServer.runBound [as eval] (domain.js:263:12)
    at REPLServer.<anonymous> (repl.js:392:12)
    at emitOne (events.js:82:20)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:210:10)
> nbv.validateNotebook(JSON.parse(fs.readFileSync("tests/invalid.ipynb", 'utf8'))); nbv.errorsText()
'oneOf data.cells[0]: should match exactly one schema in oneOf'

*/

module.exports = NotebookValidator;
