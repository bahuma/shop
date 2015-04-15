var api = require('./api.js');
var express = require('express');
var passport = require('passport');

// Setup router
var router = express.Router();

router.route('/customer')
    .get(api.getCustomers);
    
router.route('/state')
    .get(api.getStates)
    .post(api.addState);
    
router.route('/user')
    .get(api.getUsers)
    .post(api.addUser);
    
router.route('/user/me')
    .get(function(req, res){
        return res.send(req.user);
    })
router.route('/login')
    .post(passport.authenticate('local'), function(req, res) {
        return res.send('signed in');
    });
    
module.exports = router;