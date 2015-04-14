var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
