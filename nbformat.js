var Validator = require('jsonschema').Validator;
var v3Schema = require('./v3/nbformat.v3.schema.json');
var v4Schema = require('./v4/nbformat.v4.schema.json');

function NotebookValidator() {
    Validator.call(this);
    this.addSchema(v3Schema, '/v3');
    this.addSchema(v4Schema, '/v4');
}
NotebookValidator.prototype = Object.create(Validator.prototype);


/**
 * Validates a notebook
 * @param  {Object} notebook Notebook object to validate
 * @return {bool}            Validity
 */
NotebookValidator.prototype.validateNotebook = function (notebook) {
    return this.validate(notebook, '/v' + notebook.nbformat);
};

/**
NotebookValidator = require('./nbformat');
nbv = new NotebookValidator();

var fs = require('fs');
var nb = "tests/test4.ipynb";
var nbModel = JSON.parse(fs.readFileSync(nb, 'utf8'));
*/

module.exports = NotebookValidator;
