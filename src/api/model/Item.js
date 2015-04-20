var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);

var itemSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    price: {type: Schema.Types.Double, required: true},
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    image: [{type: String, required: false}]
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
