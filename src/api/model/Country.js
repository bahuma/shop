var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    name: String,
    code: String
});

var Country = mongoose.model(countrySchema, 'State');

module.exports = Country;
