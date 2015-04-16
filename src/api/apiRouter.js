var express = require('express');
var passport = require('passport');

var utilities = require('./utilities.js');

var categoryController = require('./controller/category.js');
var customerController = require('./controller/customer.js');
var stateController = require('./controller/state.js');
var userController = require('./controller/user.js');

// Setup router
var router = express.Router();


// Routes

// Category
router.route('/category')
    .get(categoryController.getCategories)
    .post(categoryController.addCategory);

router.route('/category/:id')
    .get(categoryController.getCategory)
    .delete(categoryController.deleteCategory)
    .put(categoryController.updateCategory)
    .patch(categoryController.updateCategory);

// Customer
router.route('/customer')
    .get(customerController.getCustomers);

// State
router.route('/state')
    .get(stateController.getStates)
    .post(utilities.isAdmin, stateController.addState);

// User
router.route('/user')
    .get(userController.getUsers)
    .post(userController.registerUser);
    
router.route('/user/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/user/:id/admin/grant')
    .get(userController.grantAdmin);
    
router.route('/user/:id/admin/revoke')
    .get(userController.revokeAdmin);
    
router.route('/user/:id/change-password')
    .post(userController.changePassword);
    
router.route('/auth/login')
    .post(passport.authenticate('local'), function(req, res) {
        return utilities.sendSuccess(res, 'User signed in successfull', req.user);
    });
    
router.route('/auth/logout')
    .get(function(req, res) {
        req.logout();
        return utilities.sendSuccess(res, "User signed out successfull");
    });
    
module.exports = router;