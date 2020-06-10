const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Blog = require('../models/Blog');
const slugify = require('slugify');

router.post('/', async (req, res) => {
    const { headerImgUrl, title, data, excerpt } = req.body;
    let slug = slugify(title, { lower: true, strict: true });
    const newBlog = await new Blog({
        headerImgUrl,
        title,
        slug,
        data,
        excerpt,
    }).save();
    res.status(201).send('Created!!!');
    console.log(headerImgUrl, title, data, excerpt);
});

router.get('/withoutFullData', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).send('server error');
    }
});

module.exports = router;
