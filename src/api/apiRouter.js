var api = require('./api.js');
var express = require('express');

var router = express.Router();

router.route('/customer')
    .get(api.getCustomers);
    
router.route('/state')
    .get(api.getStates)
    .post(api.addState);
    
module.exports = router;