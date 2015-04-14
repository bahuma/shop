var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stateSchema = new Schema({
    name: String,
});

var State = mongoose.model(stateSchema, 'State');

module.exports = State;
