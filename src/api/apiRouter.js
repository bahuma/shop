var api = require('./api.js');
var express = require('express');
var bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.route('/customer')
    .get(api.getCustomers);
    
router.route('/state')
    .get(api.getStates)
    .post(api.addState);
    
router.route('/user')
    .get(api.getUsers)
    .post(api.addUser);
    
module.exports = router;