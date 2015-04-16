var utilities = require('../utilities.js');

var DBCategory = require('../model/Category.js');

var categoryController = {};

categoryController.getCategories = function (req, res) {
    DBCategory.find({}, function(err, categories){
        if (err) {
            return res.send(err);
        }
        
        res.json(categories);
    });
};

categoryController.getCategory = function (req, res) {
    DBCategory.findById(req.params.id, function(err, category){
        if (err) {
            return res.send(err);
        }
        
        res.json(category);
    });
};

categoryController.addCategory = function (req, res) {
    var category = new DBCategory({
        name: req.body.name,
        description: req.body.description
    });
    
    category.save(function(err, createdCategory){
        if (err) {
            return res.send(err);
        }
        
        utilities.sendSuccess(res, "Category created", createdCategory);
    });
};

categoryController.updateCategory = function(req, res) {
    DBCategory.findById(req.params.id, function(err, category) {
        if (err) {
            return res.send(err);
        }
        
        if (req.body.name !== undefined) {
            category.name = req.body.name;
        }
        
        if (req.body.description !== undefined) {
            category.description = req.body.description;
        }
        
        category.save(function(err, category){
            if (err) {
                res.send(err);
            }
            
            utilities.sendSuccess(res, "Category updated", category);
        });
    })
}

categoryController.deleteCategory = function(req, res) {
    DBCategory.findOneAndRemove({_id: req.params.id}, function(err, removedCategory){
        if (err) {
            return res.send(err);
        }
        
        utilities.sendSuccess(res, "Category delted", removedCategory);
    });
};

module.exports = categoryController;