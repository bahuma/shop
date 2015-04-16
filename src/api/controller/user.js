var utilities = require('../utilities.js');

var DBUser = require('../model/User.js');

var userController = {};

userController.getUsers = function(req, res) {
    DBUser.find({}, function(err, users) {
        if (err){
            return res.send(err);
        }
        
        for (var index = 0; index < users.length; ++index) {
            users[index] = users[index].toObject();
            delete users[index].hash;
            delete users[index].salt;
        }
        
        res.json(users);
    });
};

userController.getUser = function(req, res) {
    if (req.params.id == "me") {
        if (req.user === undefined) {
            return res.status(404).send('Not logged in');
        }
        
        var user = req.user;
        
        user = user.toObject();
        
        delete user.hash;
        delete user.salt;
        
        return res.json(user);
    }
    
    DBUser.findById(req.params.id, function(err, user) {
        if (err){
            return res.send(err);
        }
        
        user = user.toObject();
        
        delete user.hash;
        delete user.salt;
        
        res.json(user);
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
    });
};


userController.updateUser = function(req, res) {
    DBUser.findById(req.params.id, function(err, user) {
        if (err) {
            res.send(err);
        }
        
        if (req.body.email !== undefined) {
            user.email = req.body.email;
        }
        
        user.save(function(err, user){
            if (err) {
                res.send(err);
            }
            
            utilities.sendSuccess(res, "User updated", user);
        });
    });
};

userController.deleteUser = function(req, res) {
    DBUser.findOneAndRemove({_id: req.params.id}, function(err, user){
       if (err) {
           return res.send(err);
       }
       
       utilities.sendSuccess(res, "User deleted", user);
    });
};

userController.grantAdmin = function(req, res) {
    DBUser.findById(req.params.id, function(err, user) {
        if (err) {
            return res.send(err);
        }
        
        user.isAdmin = true;
        
        user.save(function(err, user){
            if (err) {
                return res.send(err);
            }
            
           utilities.sendSuccess(res, "User is now admin", user); 
        });
    });
};

userController.revokeAdmin = function(req, res) {
    DBUser.findById(req.params.id, function(err, user) {
        if (err) {
            return res.send(err);
        }
        
        user.isAdmin = false;
        
        user.save(function(err, user){
            if (err) {
                return res.send(err);
            }
            
           utilities.sendSuccess(res, "User is no longer admin", user); 
        });
    });
};

userController.changePassword = function(req, res) {
    var userToAlter;
    
    if (req.params.id == "me") {
        
        if (req.user === undefined) {
            return res.status(404).send('Not logged in');
        }
        
        req.user.setPassword(req.body.password, function(err, user) {
            if (err) {
                return res.send(err);
            }
            
            user.save(function(err, userAltered){
                if (err) {
                    return res.send(err); 
                }
                
                utilities.sendSuccess(res, "Password changed", userAltered);
            }); 
        });
    } else {
        DBUser.findById(req.params.id, function(err, user){
            if (err) {
                return res.send(err);
            }
            
            user.setPassword(req.body.password, function(err, user) {
                if (err) {
                    return res.send(err);
                }
                
                user.save(function(err, userAltered){
                    if (err) {
                        return res.send(err); 
                    }
                    
                    utilities.sendSuccess(res, "Password changed", userAltered);
                }); 
            });
        });
    }
}

module.exports = userController;