var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: String,
  description: String
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;