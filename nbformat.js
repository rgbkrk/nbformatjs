var JaySchema = require('jayschema');
var v3Schema = require('./v3/nbformat.v3.schema.json');
var v4Schema = require('./v4/nbformat.v4.schema.json');

function NotebookValidator() {
    JaySchema.call(this);
    this.register(v3Schema, '/v3');
    this.register(v4Schema, '/v4');
}
NotebookValidator.prototype = Object.create(JaySchema.prototype);


/**
 * Validates a notebook
 * @param  {Object} notebook Notebook object to validate
 * @return {Object[]}        Array of JaySchema error objects
 */
NotebookValidator.prototype.validateNotebook = function (notebook) {
    return this.validate(notebook, '/v' + notebook.nbformat);
};

/**
NotebookValidator = require('./nbformat');
nbv = new NotebookValidator();

var fs = require('fs');
var nbModel = JSON.parse(fs.readFileSync("tests/test4.ipynb", 'utf8'));
nbv.validateNotebook(nbModel)
*/

module.exports = NotebookValidator;
