const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController');

// Get
routes.get('/:roleName/associated', userController.getUsersByRole);

module.exports = routes;