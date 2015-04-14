var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    address: [{ type: Schema.Types.ObjectId, ref: 'Address', required: true }],
    birthday: {type: Date, required: true}
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
