var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var uniqueValidator = require('mongoose-unique-validator');

var categorySchema = new Schema({
  name: {type: String, required: true, unique: true},
  description: String
});

categorySchema.plugin(uniqueValidator);

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
