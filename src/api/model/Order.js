var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var positionSchema = new Schema({
    number: Number,
    quantity: Number,
    price: Schema.Types.Double
});

var orderSchema = new Schema({
    number: Number,
    date: Date,
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    positions: [positionSchema],
    billingAddress: { type: Schema.Types.ObjectId, ref: 'Address' },
    shippingAddress: { type: Schema.Types.ObjectId, ref: 'Address' }
});

var Order = mongoose.model(orderSchema, 'Order');

module.exports = Order;
