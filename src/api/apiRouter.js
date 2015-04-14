var express = require('express');

var router = express.Router();

router.route('/test')
    .get(function(req, res){
        res.send('test called');
    });
    
module.exports = router;