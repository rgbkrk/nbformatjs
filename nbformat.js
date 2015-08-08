//var Validator = require('jsonschema').Validator;
var tv4 = require('tv4');

var v3Schema = require('./v3/nbformat.v3.schema.json');
var v4Schema = require('./v4/nbformat.v4.schema.json');

tv4.addSchema('nbformat.v3.schema', v3Schema);
tv4.addSchema('nbformat.v4.schema', v4Schema);


/**
 * Validates a notebook
 * @param  {Object} notebook Notebook object to validate
 * @return {Object}          Validity object
 */
var validateNotebook = function (notebook) {
    var valid = tv4.validate(notebook, "nbformat.v" + notebook.nbformat + ".schema");
    // Could return valid, but I'd rather not squish the errors
    // Better to have them

    return tv4.errors;
};

/**
validateNotebook = require('./nbformat');

var fs = require('fs');
var nbModel1 = JSON.parse(fs.readFileSync("tests/test1.ipynb", 'utf8'));
var nbModel2 = JSON.parse(fs.readFileSync("tests/test2.ipynb", 'utf8'));
var nbModel3 = JSON.parse(fs.readFileSync("tests/test3.ipynb", 'utf8'));
var nbModel4 = JSON.parse(fs.readFileSync("tests/test4.ipynb", 'utf8'));
*/

module.exports = validateNotebook;
