var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
    name: String,
    surname: String,
    address: { type: Schema.Types.ObjectId, ref: 'Address' },
    birthday: Date
});

var Customer = mongoose.model(customerSchema, 'Customer');

module.exports = Customer;
