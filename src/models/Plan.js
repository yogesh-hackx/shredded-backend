const mongoose = require('mongoose');

const { String } = mongoose.Schema.Types;

const planSchema = new mongoose.Schema({
    title: String,
    info: String,
    amount: Number,
    duration: Number,
});

const Plan = mongoose.model('Plan', planSchema);

module.exports = Plan;
