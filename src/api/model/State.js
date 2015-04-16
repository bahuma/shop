var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateSchema = new Schema({
    name: {type: String, required: true, unique: true}
});

var State = mongoose.model('State', stateSchema);

module.exports = State;
