const express = require('express');
const routes = express.Router();
const authenticateController = require('../controllers/authenticateController');

routes.post('/', authenticateController.signIn);
routes.post('/refreshtoken', authenticateController.signIn);

module.exports = routes;
