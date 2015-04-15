var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username: String,
    password: String,
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: false },
    email: {type: String, required: true},
    isAdmin: Boolean
});

// Validate email field
userSchema.path('email').validate(function(value) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/;
  return emailRegex.test(value); 
}, 'E-Mail Address not valid');

// Use passport
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

module.exports = User;
