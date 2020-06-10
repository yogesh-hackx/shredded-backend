const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
        return res.status(422).send('Auth Failed');
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
        email,
        password: hash,
    }).save();

    const token = jwt.sign(
        {
            userId: newUser._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
    res.status(201).json(token);
});

router.get('/hello', (req, res) => {
    res.send('Hello');
});
module.exports = router;
