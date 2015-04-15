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

module.exports = utilities;