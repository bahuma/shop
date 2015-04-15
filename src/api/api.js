var DBCustomer = require('./model/Customer.js');
var DBState = require('./model/State.js');
var DBUser = require('./model/User.js');

var sendSuccess = function(res, message, object){
    
    if (object === undefined) {
        object = {};
    }
    
    res.json({
        status: "success",
        message: message,
        object: object
    });
};


var api = {};

api.getCustomers = function(req, res) {
    DBCustomer.find({}, function(err, customers){
       if (err) {
           return res.send(err);
       }
       
       res.json(customers);
    });
};

api.addCustomer = function(req, res) {
    
};

api.getStates = function(req, res) {
    DBState.find({}, function(err, states){
        if (err) {
            return res.send(err);
        }
        
        res.json(states);
    });
};

api.addState = function(req, res) {
    var state = new DBState({
        name: req.body.name
    });
    
    state.save(function(err, createdState){
        if (err) {
            return res.send(err);
        }
        
        sendSuccess(res, "State created", createdState);
    });
};

api.getUsers = function(req, res) {
    DBUser.find({}, function(err, users) {
        if (err){
            return res.send(err);
        }
        
        res.json(users);
    });
};

api.addUser = function(req, res) {
    var user = new DBUser({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    });
    
    user.save(function(err, createdUser){
        if(err) {
            return res.send(err);
        }
        
        sendSuccess(res, "User created", createdUser);
    });
};

module.exports = api;