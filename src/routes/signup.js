const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
        return res.status(422).send('User Already Exists');
    }

    const hash = await bcrypt.hashSync(password, 10);
    const newUser = await new User({
        name,
        email,
        password: hash,
    }).save();

    const token = jwt.sign(
        {
            id: newUser._id,
            role: newUser.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
    return res.status(201).json({
        token,
        user: {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            id: newUser._id,
        },
    });
});

router.get('/hello', (req, res) => {
    res.send('Hello');
});
module.exports = router;
