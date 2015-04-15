var utilities = require('../utilities.js');

var DBState = require('../model/State.js');

var stateController = {};

stateController.getStates = function(req, res) {
    DBState.find({}, function(err, states){
        if (err) {
            return res.send(err);
        }
        
        res.json(states);
    });
};

stateController.addState = function(req, res) {
    var state = new DBState({
        name: req.body.name
    });
    
    state.save(function(err, createdState){
        if (err) {
            return res.send(err);
        }
        
        utilities.sendSuccess(res, "State created", createdState);
    });
};

module.exports = stateController;