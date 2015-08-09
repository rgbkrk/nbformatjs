var Ajv = require('ajv');
var JaySchema = require('jayschema');

var v3Schema = require('./v3/nbformat.v3.schema.json');
var v4Schema = require('./v4/nbformat.v4.schema.json');

/**
 * NotebookValidator inherits from JaySchema for verbosity and composes ajv for
 * optional speed.
 */
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

/**
 * isValid returns whether or not this is a strictly conforming notebook
 * @param  {Object}  notebook Notebook object to validate
 * @return {Boolean}          notebook was strictly conforming to a schema
 */
NotebookValidator.prototype.isValid = function (notebook) {
    // Super wrong if not an Object
    // Bad if nbformat not there
    if (!notebook || !notebook.nbformat) {
        return false;
    }

    if (notebook.nbformat !== 3 && notebook.nbformat !== 4){
        return false;
    }
    return this.ajv.validate('/v' + notebook.nbformat, notebook);
};

/**
var NotebookValidator = require('./nbformat');
var fs = require('fs');

nbv = new NotebookValidator();

testFilenames = [
    "tests/test2.ipynb",
    "tests/test3.ipynb",
    "tests/test4.ipynb",
    "tests/test4plus.ipynb",
    "tests/invalid.ipynb",
]

notebooks = {}

testFilenames.forEach(function(item) {
    rawJSON = fs.readFileSync(item);
    notebooks[item] = JSON.parse(rawJSON);
});

nbv.isValid(notebooks["tests/test2.ipynb"])
nbv.isValid(notebooks["tests/test3.ipynb"])
nbv.isValid(notebooks["tests/test4.ipynb"])
nbv.isValid(notebooks["tests/test4plus.ipynb"])
nbv.isValid(notebooks["tests/invalid.ipynb"])


nbv.validateNotebook(notebooks["tests/test2.ipynb"])
nbv.validateNotebook(notebooks["tests/test3.ipynb"])
nbv.validateNotebook(notebooks["tests/test4.ipynb"])
nbv.validateNotebook(notebooks["tests/test4plus.ipynb"])
nbv.validateNotebook(notebooks["tests/invalid.ipynb"])

*/

module.exports = NotebookValidator;
