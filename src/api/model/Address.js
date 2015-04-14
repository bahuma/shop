var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    street: String,
    number: String,
    zip: String,
    city: String,
    state: {type: Schema.Types.ObjectId, ref: 'State'},
    country: {type: Schema.Types.ObjectId, ref: 'Country'}
});

var Address = mongoose.model(addressSchema, 'Address');

module.exports = Address;
