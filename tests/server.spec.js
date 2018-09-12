require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server');
const User = require('../User/User');
const Article = require('../Article/Article');

describe('server', () => {
    beforeAll(() => {
        return mongoose
            .connect(
                'mongodb://127.0.0.1/goodnews',
                { useNewUrlParser: true }
            )
            .then(() => console.log('connected to db'));
    });

    afterAll(() => {
        return mongoose.disconnect();
    });

    // User Tests
    test('User - test 1: should return 200 and a response', async () => {
        const response = await request(server).get('/api/user');
        expect(response.status).toBe(200);
    });
    test('User - test 2: POST should return 201', async () => {
        const newUserEmail = 'sammy@gmail.com';
        const newUsername = 'sammy';
        const mockUser = { username: 'sammy', email: 'sammy@gmail.com', password: '123' };
        const newUser = await User.create(mockUser);
        const response = await request(server).post('/api/user/register').send(newUser);
        expect(response.status).toBe(201);
        expect(newUser.email).toBe(newUserEmail);
        expect(newUser.username).toBe(newUsername);
        await mongoose.connection.db.dropCollection('users');
    });
    test('User - test 3: GET should return 200', async () => {
        const mockUser = { email: 'johnsmith@gmail.com', password: '123' };
        const newUser = await User.create(mockUser);
        const response = await request(server).get(`/api/user/${newUser._id}`);
        expect(response.status).toBe(200);
        await mongoose.connection.db.dropCollection('users');
    });
    test('User - test 4: PUT should return 201', async () => {
        const mockUser = { email: 'johnsmith@gmail.com', password: '123' };
        const newUser = await User.create(mockUser);
        const response = await request(server).put(`/api/user/${newUser.id}`).send((newUser.email = 'johnsmith@gmail.com'));
        expect(response.status).toBe(201);
        await mongoose.connection.db.dropCollection('users');
    });
    test('User - test 5: DELETE should return 204', async () => {
        const mockUser = { email: 'johnsmith@gmail.com', password: '123' };
        const newUser = await User.create(mockUser);
        const response = await request(server).delete(`/api/user/${newUser._id}`);
        expect(response.status).toBe(204);
        await mongoose.connection.db.dropCollection('users');
    });

    // Article Tests
    test('Article - test 1: should return 200 and a response', async () => {
        const mockArticle = { name: 'NYT: White House eyes 12 potential authors behind anonymous op-ed', 
            url: 'https://www.cnn.com/2018/09/07/politics/trump-new-york-times-op-ed-suspects/index.html' };
        const newArticle = await Article.create(mockArticle);
        const response = await request(server).get('/api/article').send(newArticle);
        expect(response.status).toBe(200);
        expect(newArticle.url).toBe(mockArticle.url);
        await mongoose.connection.db.dropCollection('articles');
    });
    test('Article - test 2: should return 200 and a response', async () => {
        const mockArticle = { name: 'NYT: White House eyes 12 potential authors behind anonymous op-ed', 
            url: 'https://www.cnn.com/2018/09/07/politics/trump-new-york-times-op-ed-suspects/index.html' };
        const newArticle = await Article.create(mockArticle);
        const response = await request(server).get(`/api/article/${newArticle._id}`);
        expect(response.status).toBe(200);
        expect(newArticle.name).toBe(mockArticle.name);
        await mongoose.connection.db.dropCollection('articles');
    });
    test('Article - test 3: should return 200 and a response', async () => {
        const mockArticle = {name: 'NYT: White House eyes 12 potential authors behind anonymous op-ed', 
            url: 'https://www.cnn.com/2018/09/07/politics/trump-new-york-times-op-ed-suspects/index.html'};
        const newArticle = await Article.create(mockArticle);
        const mockUser = { email: 'johnsmith@gmail.com', password: '123' };
        const newUser = await User.create(mockUser);
        await newUser.saved_articles.push(newArticle._id);
        const response = await request(server).get(`/api/article/${newArticle._id}`).send(newUser.saved_articles);
        expect(response.status).toBe(200);
        await mongoose.connection.db.dropCollection('articles');
        await mongoose.connection.db.dropCollection('users');
    });
});