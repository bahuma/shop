var utilities = {};

utilities.sendSuccess = function(res, message, object){
    
    if (object === undefined) {
        object = {};
    }
    
    res.json({
        status: "success",
        message: message,
        object: object
    });
};

utilities.isAdmin = function(req, res, next) {
    if (req.user !== undefined) {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).send('You must have admin rights.');
        }
    } else {
        res.status(403).send('You must be logged in to do that');
    }
}

utilities.isLoggedIn = function(req, res, next) {
    if (req.user !== undefined) {
        next();
    } else {
        res.status(403).send('You must be logged in to do that.');
    }
}

module.exports = utilities;