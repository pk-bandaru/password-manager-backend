// V2 Router Module
const express = require('express');

const router = express.Router();

router.get('/', (request, response) => {response.send('V2 Module: Hello User!')});

module.exports = router;