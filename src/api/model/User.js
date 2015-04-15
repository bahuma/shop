var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: false },
    email: {type: String, required: true}
});

// Validate email field
userSchema.path('email').validate(function(value) {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,})?$/;
   return emailRegex.test(value); 
}, 'E-Mail Address not valid');

var User = mongoose.model('User', userSchema);

module.exports = User;
