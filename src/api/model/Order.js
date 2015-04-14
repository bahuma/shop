var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var positionSchema = new Schema({
    number: {type: Number, required: true},
    quantity: {type: Number, required: true},
    price: {type: Schema.Types.Double, required: true}
});

var orderSchema = new Schema({
    number: {type: Number, required: true},
    date: {type: Date, required: true},
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    positions: [{type: positionSchema, required: true}],
    billingAddress: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
    shippingAddress: { type: Schema.Types.ObjectId, ref: 'Address', required: true }
});

var Order = mongoose.model('Order', orderSchema);

module.exports = Order;
