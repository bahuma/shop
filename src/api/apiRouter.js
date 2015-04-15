var express = require('express');
var passport = require('passport');

var utilities = require('./utilities.js');

var customerController = require('./controller/customer.js');
var stateController = require('./controller/state.js');
var userController = require('./controller/user.js');

// Setup router
var router = express.Router();

router.route('/customer')
    .get(customerController.getCustomers);
    
router.route('/state')
    .get(stateController.getStates)
    .post(stateController.addState);
    
router.route('/user')
    .get(userController.getUsers)
    .post(userController.registerUser);
    
router.route('/user/me')
    .get(userController.getMe);
    
router.route('/user/login')
    .post(passport.authenticate('local'), function(req, res) {
        return utilities.sendSuccess(res, 'User signed in successfull', req.user);
    });
    
module.exports = router;