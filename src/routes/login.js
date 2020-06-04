const express = require('express');

const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
    res.send('I m, Login Route Handler');
});

module.exports = router;
