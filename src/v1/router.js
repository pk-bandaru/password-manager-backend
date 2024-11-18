// V1 Router Module
const express = require('express');
const authHandler = require('./handler/auth');

const router = express.Router();

router.get('/', (request, response) => {response.send('V1 Module: Hello User!')});
router.post('/register', authHandler.validateRegistration, authHandler.registerNewUser);
router.post('/login', authHandler.validateLogin, authHandler.userLogin);

module.exports = router;