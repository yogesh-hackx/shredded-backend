const mongoose = require('mongoose');
const { String } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
