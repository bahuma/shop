var DBCustomer = require('../model/Customer.js');

var customerController = {};


customerController.getCustomers = function(req, res) {
    DBCustomer.find({}, function(err, customers){
       if (err) {
           return res.send(err);
       }
       
       res.json(customers);
    });
};

customerController.addCustomer = function(req, res) {
    
};


module.exports = customerController;

