var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: String,
    description: String,
    price: Schema.Types.Double,
    _category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    image: [String]
});

var Item = mongoose.model('Item', itemSchema);

module.exports(Item);