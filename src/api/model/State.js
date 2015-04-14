var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateSchema = new Schema({
    name: String,
});

var State = mongoose.model('State', stateSchema);

module.exports = State;
