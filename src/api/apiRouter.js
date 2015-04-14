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
    
module.exports = router;