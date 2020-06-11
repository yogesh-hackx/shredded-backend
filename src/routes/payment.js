const express = require('express');
const Jssha = require('jssha');

const router = express.Router();

router.post('/payuhash', (req, res) => {
    if (!req.body.txnid || !req.body.amount
        || !req.body.productinfo
        || !req.body.firstname
        || !req.body.email) {
        res.send('Missing important fields');
    } else {
        const hashString = `${process.env.MERCHANT_KEY}|${req.txnid
        }|${req.amount}|${req.productinfo}|${
            req.firstname}|${req.email}|`
        + `||||||||||${
            process.env.MERCHANT_SALT}`;

        const sha = new Jssha('SHA-512', 'TEXT');
        sha.update(hashString);

        const hash = sha.getHash('HEX');
        res.send({ hash });
    }
});

router.post('/response', (req, res) => {
    const hashString = `${process.env.MERCHANT_SALT}|${
        req.status}||||||||||`
     + `|${req.email}|${
         req.firstname}|${
         req.productinfo}|${
         req.amount}|${
         req.txnid}|${
         process.env.MERCHENT_KEY}`;

    const sha = new Jssha('SHA-512', 'TEXT');
    sha.update(hashString);

    const hash = sha.getHash('HEX');

    if (hash === req.hash) {
        res.send({ status: req.status });
    } else {
        res.send({ status: 'Error occured!' });
    }
});

module.exports = router;
