const mongoose = require('mongoose');
const { String } = mongoose.Schema.Types;

const REQUIRED_STRING = { type: String, required: true };

const blogSchema = new mongoose.Schema({
    headerImgUrl: REQUIRED_STRING,
    title: REQUIRED_STRING,
    slug: { ...REQUIRED_STRING, unique: true },
    data: { ...REQUIRED_STRING, select: false },
    excerpt: REQUIRED_STRING,
});
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
