const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(404).json({ message: 'Auth failed!!' });
    }

    await bcrypt.compare(password, user.password)
        .then((exists) => {
            if (exists) {
                const token = jwt.sign(
                    {
                        id: user._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '7d',
                    },
                );
                return res.json(token);
            }

            return res.status(404).json({ message: 'Auth failed!!' });
        });
});
module.exports = router;
