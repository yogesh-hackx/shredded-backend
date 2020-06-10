const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');
const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const uploadRoute = require('./routes/upload');
const blogRoute = require('./routes/blog');
const middlewares = require('./middlewares');
const { cloudinaryConfig } = require('./config/cloudinaryConfig');

require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('<-- connected to database -->'));

app.use(morgan('common'));
app.use(helmet());
app.use(
    cors({
        origin: '*',
        // origin: process.env.CORS_ORIGIN,
    }),
);
app.use(express.json());
app.use('*', cloudinaryConfig);

app.get('/', (req, res) => {
    res.json({
        message: 'HelloWorld',
    });
});

app.use('/login', loginRoute);
app.use('/signup', signupRoute);
app.use(
    '/upload',
    // expressJwt({ secret: process.env.JWT_SECRET, requestProperty: 'auth' }),
    uploadRoute,
);
app.use('/blog', blogRoute);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
