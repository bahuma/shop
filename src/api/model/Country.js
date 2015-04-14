var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countrySchema = new Schema({
    name: {type: String, required: true},
    code: {type: String, required: true}
});

var Country = mongoose.model('State', countrySchema);

module.exports = Country;
