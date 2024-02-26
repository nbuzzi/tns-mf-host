const express = require('express');
const routes = express.Router();
const userRolesController = require('../controllers/userRolesController');

// Get
routes.get('/', userRolesController.getRoles);
routes.get('/name/:roleName/available', userRolesController.isAvailable);

// Post
routes.post('/', userRolesController.getRoles);

module.exports = routes;
