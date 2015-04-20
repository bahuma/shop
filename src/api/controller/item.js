var utilities = require('../utilities.js');

var DBItem = require('../model/Item.js');

var itemController = {};

itemController.getItems = function (req, res) {
    DBItem.find({}, function(err, items) {
       if (err) {
           return res.send(err);
       }
       
       res.json(items);
    });
};

itemController.getItem = function (req, res) {
    DBItem.findById(req.params.id, function(err, item){
        if (err) {
            return res.send(err);
        }
        
        res.json(item);
    });
};

itemController.addItem = function (req, res) {
    var item = new DBItem({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    });
    
    if (req.body.description !== undefined) {
        item.description = req.body.description;
    }
    
    if (req.body.image !== undefined) {
        item.image = req.body.image;
    }
    
    item.save(function(err, item){
        if (err) {
            return res.send(err);
        }
        
        utilities.sendSuccess(res, "Item created", item);
    });
};

itemController.updateItem = function (req, res) {
    DBItem.findById(req.params.id, function(err, item){
        if (err) {
            return res.send(err);
        }
        
        if (item === null) {
            return utilities.sendError(res, "Item not found");
        }
        
        if (req.body.name !== undefined) {
            item.name = req.body.name;
        }
        
        if (req.body.description !== undefined) {
            item.description = req.body.description;
        }
        
        if (req.body.price !== undefined) {
            item.price = req.body.price;
        }
        
        if (req.body.category !== undefined) {
            item.category = req.body.category;
        }
        
        if (req.body.image !== undefined) {
            item.image = req.body.image;
        }
        
        item.save(function(err, item) {
            if (err) {
                return res.send(err);
            }
            
            utilities.sendSuccess(res, "Item updated", item);
        });
    });
};

itemController.deleteItem = function (req, res) {
    DBItem.findOneAndRemove({_id: req.params.id}, function(err, item) {
        if (err) {
            return res.send(err);
        }
        
        utilities.sendSuccess(res, "Item deleted", item);
    });
};

module.exports = itemController;