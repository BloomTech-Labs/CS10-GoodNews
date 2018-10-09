require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server');
const User = require('../User/User');
const Article = require('../Article/Article');
const MongodbMemoryServer = require('mongodb-memory-server').MongoMemoryServer
const mongod = new MongodbMemoryServer()

describe('server', () => {
    beforeAll(async () => {
      const uri = await mongod.getConnectionString();
      await mongoose.connect(uri, { useNewUrlParser: true });
    });

    afterAll(() => {
        mongoose.disconnect();
        mongod.stop();
    });

    // User Tests
    test('User - GET users: should return 403 if not logged in, protected route', async () => {
        const response = await request(server).get('/api/user');
        expect(response.status).toBe(403);
    });
    // test('User - GET users: should return 200 and users if logged in', async () => {
    //     const newUserEmail = 'sammy@gmail.com';
    //     const newUsername = 'sammy';
    //     const mockUser = { username: 'sammy', email: 'sammy@gmail.com', password: '123' };
    //     const newUser = await User.create(mockUser);
    //     const response = await request(server).post('/api/user/register').send(newUser);
    //     const token = response.body.token;
    //     const id = response.body.user._id;
    //     const config = {headers: { 'authorization': token, 'userid': id }};
    //     const response2 = await request(server).get('/api/user').send(config);
    //     expect(response2.status).toBe(200);
    // })
    test('User - POST register user: should return 201 and new user', async () => {
        const newUserEmail = 'sammy@gmail.com';
        const newUsername = 'sammy';
        const mockUser = { username: 'sammy', email: 'sammy@gmail.com', password: '123' };
        const newUser = await User.create(mockUser);
        const response = await request(server).post('/api/user/register').send(newUser);
        expect(response.status).toBe(201);
        expect(newUser.email).toBe(newUserEmail);
        expect(newUser.username).toBe(newUsername);
        expect(response.body.user.username).toBe(newUsername);
        await mongoose.connection.db.dropCollection('users');
    });
    // test('User - GET user: should return 200', async () => {
    //     const mockUser = { email: 'johnsmith@gmail.com', password: '123' };
    //     const newUser = await User.create(mockUser);
    //     const response = await request(server).get(`/api/user/${newUser._id}`);
    //     expect(response.status).toBe(200);
    //     await mongoose.connection.db.dropCollection('users');
    // });
    // test('User - PUT user: should return 201', async () => {
    //     const mockUser = { email: 'johnsmith@gmail.com', password: '123' };
    //     const newUser = await User.create(mockUser);
    //     const response = await request(server).put(`/api/user/${newUser.id}`).send((newUser.email = 'johnsmith@gmail.com'));
    //     expect(response.status).toBe(201);
    //     await mongoose.connection.db.dropCollection('users');
    // });
    // test('User - DELETE user: should return 204', async () => {
    //     const mockUser = { email: 'johnsmith@gmail.com', password: '123' };
    //     const newUser = await User.create(mockUser);
    //     const response = await request(server).delete(`/api/user/${newUser._id}`);
    //     expect(response.status).toBe(204);
    //     await mongoose.connection.db.dropCollection('users');
    // });

    // Article Tests
    test('Article - GET non-clickbait articles: should return 200 and a response', async () => {
        const mockArticle = { 
            name: 'NYT: White House eyes 12 potential authors behind anonymous op-ed', 
            url: 'https://www.cnn.com/2018/09/07/politics/trump-new-york-times-op-ed-suspects/index.html',
            clickbait: '0'
          };
        const newArticle = await Article.create(mockArticle);
        const response = await request(server).get('/api/article/get-articles/0/1');
        expect(response.status).toBe(200);
        expect(newArticle.url).toBe(mockArticle.url);
        await mongoose.connection.db.dropCollection('articles');
    });
    test('Article - GET article by id: should return 200 and a response', async () => {
        const mockArticle = { name: 'NYT: White House eyes 12 potential authors behind anonymous op-ed', 
            url: 'https://www.cnn.com/2018/09/07/politics/trump-new-york-times-op-ed-suspects/index.html' };
        const newArticle = await Article.create(mockArticle);
        const response = await request(server).get(`/api/article/get/${newArticle._id}`);
        expect(response.status).toBe(200);
        expect(newArticle.name).toBe(mockArticle.name);
        expect(response.body.name).toBe(mockArticle.name);
        await mongoose.connection.db.dropCollection('articles');
    });
    test('Article - GET article by keyword: should return 200 and a response', async () => {
        const mockArticle = {
            name: 'NYT: White House eyes 12 potential authors behind anonymous op-ed', 
            url: 'https://www.cnn.com/2018/09/07/politics/trump-new-york-times-op-ed-suspects/index.html',
            keywords: ['white'],
            clickbait: '0'
          };
        const newArticle = await Article.create(mockArticle);
        const response = await request(server).get(`/api/article/white`);
        expect(response.status).toBe(200);
        expect(response.body[0].name).toBe(mockArticle.name);
        await mongoose.connection.db.dropCollection('articles');
    });
});