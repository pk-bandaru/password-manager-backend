// V1 Router Module
const express = require('express');
const authHandler = require('./handler/auth');
const accHandler = require('./handler/account');

const router = express.Router();

// Authentication Handlers
router.get('/', (request, response) => {response.send('V1 Module: Hello User!')});
router.post('/register', authHandler.validateRegistration, authHandler.registerNewUser);
router.post('/login', authHandler.validateLogin, authHandler.userLogin);

// Account Specific Handlers
router.get('/accounts', authHandler.validateToken, accHandler.getAccounts);

module.exports = router;