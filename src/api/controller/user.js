var utilities = require('../utilities.js');

var DBUser = require('../model/User.js');

var userController = {};

userController.getUsers = function(req, res) {
    DBUser.find({}, function(err, users) {
        if (err){
            return res.send(err);
        }
        
        res.json(users);
    });
};

userController.registerUser = function(req, res) {
    DBUser.register(new DBUser({
        username: req.body.username,
        email: req.body.email
    }), req.body.password, function(err, createdUser){
        if(err) {
            return res.send(err);
        }
        
        utilities.sendSuccess(res, 'User registered', createdUser);
        // passport.authenticate('local')(req, res, function () {
        //     sendSuccess(res, 'User created and signed in', createdUser);
        // });

    });
};

userController.getMe = function(req, res) {
    return res.send(req.user);
}

module.exports = userController;