require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const UserRouter = require('./User/UserRouter');
const ArticleRouter = require('./Article/ArticleRouter');

const server = express();

const authMiddleware = (req, res, next) => {
	// TODO: Implement Authentication and Authorization
	// const {token, uid} = req.headers;
	// Will require Front-End Caching of Data to save spot
	// So data is back if user's token expires while they are not done.
	next();
};

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(express.static('./client/build/'));

// User and Article API Routes
server.use('/api/article', authMiddleware, ArticleRouter);
server.use('/api/user', authMiddleware, UserRouter);

module.exports = server;