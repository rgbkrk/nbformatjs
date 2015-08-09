var Ajv = require('ajv');
var JaySchema = require('jayschema');

var v3Schema = require('./v3/nbformat.v3.schema.json');
var v4Schema = require('./v4/nbformat.v4.schema.json');

function NotebookValidator() {
    JaySchema.call(this);

    this.ajv = new Ajv();

    this.ajv.addSchema(v3Schema, '/v3');
    this.ajv.addSchema(v4Schema, '/v4');

    this.register(v3Schema, '/v3');
    this.register(v4Schema, '/v4');
}

NotebookValidator.v3Schema = v3Schema;
NotebookValidator.v4Schema = v4Schema;

NotebookValidator.prototype = Object.create(JaySchema.prototype);


/**
 * Validates a notebook
 * @param  {Object} notebook Notebook object to validate
 * @return {Object[]}        Array of JaySchema error objects
 */
NotebookValidator.prototype.validateNotebook = function (notebook) {
    return this.validate(notebook, '/v' + notebook.nbformat);
};

NotebookValidator.prototype.isValid = function (notebook) {
    return this.ajv.validate('/v' + notebook.nbformat, notebook);
};

/**
var NotebookValidator = require('./nbformat');
var fs = require('fs');

nbv = new NotebookValidator();

nbv.validateNotebook(JSON.parse(fs.readFileSync("tests/test1.ipynb", 'utf8')));
nbv.validateNotebook(JSON.parse(fs.readFileSync("tests/test2.ipynb", 'utf8')));
nbv.validateNotebook(JSON.parse(fs.readFileSync("tests/test3.ipynb", 'utf8')));
nbv.validateNotebook(JSON.parse(fs.readFileSync("tests/test4.ipynb", 'utf8')));
nbv.validateNotebook(JSON.parse(fs.readFileSync("tests/invalid.ipynb", 'utf8')));
*/

module.exports = NotebookValidator;
