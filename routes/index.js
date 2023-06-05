const express = require('express');
const router = express.Router();
const admin = require('./adminRoute');
const user = require('./userRoute');

// middlewares for each route
router.use('/', admin);
router.use('/', user);

module.exports = router;