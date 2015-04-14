var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    street: {type: String, required: true},
    number: {type: String, required: true},
    zip: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: Schema.Types.ObjectId, ref: 'State'},
    country: {type: Schema.Types.ObjectId, ref: 'Country', required: true}
});

var Address = mongoose.model('Address', addressSchema);

module.exports = Address;
