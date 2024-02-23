require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/users');
var tweetsRouter = require('./routes/tweets');

var app = express();

const cors = require('cors');

const corsOptions = {
    origin: function (origin, callback) {
        // Replace 'allowedOrigins' with your specific origins for production
        const allowedOrigins = [
        "https://tweetapp-frontend.vercel.app",
        "http://localhost:3001"
        ];
        if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
};

app.use(cors(corsOptions));
  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/tweets', tweetsRouter);

module.exports = app;
