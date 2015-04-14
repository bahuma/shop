var DBCustomer = require('./model/Customer.js');
var DBState = require('./model/State.js');

var sendSuccess = function(res, message, object){
    
    if (object.typeof === null) {
        object = {};
    }
    
    res.json({
        status: "success",
        message: message,
        object: object
    })
}

var api = {};

api.getCustomers = function(req, res) {
    DBCustomer.find({}, function(err, customers){
       if (err) {
           res.send(err);
       }
       
       res.json(customers);
    });
}

api.addCustomer = function(req, res) {
    
}

api.getStates = function(req, res) {
    DBState.find({}, function(err, states){
        if (err) {
            res.send(err);
        }
        
        res.json(states);
    });
};

api.addState = function(req, res) {
    var state = new DBState({
        name: req.body.name
    });
    
    state.save(function(err, state){
        if (err) {
            res.send(err);
        }
        
        sendSuccess(res, "State created", state);
    })
};

module.exports = api;