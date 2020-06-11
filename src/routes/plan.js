const express = require('express');

const router = express.Router();

const Plan = require('../models/Plan');


router.get('/', async (req, res) => {
    await Plan.find()
        .then((plans) => {
            if (plans) {
                res.json(plans);
            } else {
                res.status(404).json('Not found!');
            }
        })
        .catch((e) => {
            console.log(e);
        });
});

module.exports = router;
