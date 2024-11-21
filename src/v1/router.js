// V1 Router Module
const express = require('express');
const authHandler = require('./handler/auth');
const accHandler = require('./handler/account');
const genericHandler = require('./handler/generic');

const router = express.Router();

// Authentication Handlers
router.get('/', (request, response) => {response.send('V1 Module: Hello User!')});
router.post('/register', authHandler.validateRegistration, authHandler.registerNewUser);
router.post('/login', authHandler.validateLogin, authHandler.userLogin);

// Generic Handlers
router.get('/categories', authHandler.validateToken, genericHandler.getCategories);
router.get('/password-types', authHandler.validateToken, genericHandler.getPasswordTypes);

// Account Specific Handlers
router.get('/accounts', authHandler.validateToken, accHandler.getAccounts);

module.exports = router;