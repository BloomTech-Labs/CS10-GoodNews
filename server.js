require('dotenv').config();
const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');

const UserRouter = require('./User/UserRouter');
const ArticleRouter = require('./Article/ArticleRouter');

const authMiddleware = (req, res, next) => {
	// TODO: Implement Authentication and Authorization
	// const {token, uid} = req.headers;
	// Will require Front-End Caching of Data to save spot
	// So data is back if user's token expires while they are not done.
	next();
};

const corsOptions = {
	origin: '*',
	credentials: true
};

server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());

// User and Article API Routes
server.use('/api/article', authMiddleware, ArticleRouter);
server.use('/api/user', authMiddleware, UserRouter);

// For serving static files to root endpoint
server.use(express.static('./client/build/'));

module.exports = server;