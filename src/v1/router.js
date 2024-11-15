// V1 Router Module
const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {response.send('V1 Module: Hello User!')});

module.exports = router;