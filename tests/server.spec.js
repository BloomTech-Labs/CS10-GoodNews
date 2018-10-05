require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server');
const User = require('../User/User');
const Article = require('../Article/Article');
// jest.setTimeout(30000);

// tests server's User and Article routes for non-authenticated users
describe('server for non-authenticated users', () => {
    beforeAll(() => {
        return mongoose
            .connect(
                'mongodb://127.0.0.1/goodnews-test',
                { useNewUrlParser: true }
            )
            .then(() => console.log('connected to db'));
    });

    afterAll((done) => {
        return mongoose.disconnect(done);
    });

    // User Tests
    test('/api/user/register method-POST-postRegister should return 201', async () => {
        const newUserEmail = 'user@email.com';
        const newUsername = 'user';
        const mockUser = { username: 'user', email: 'user@email.com', password: '123' };
        const newUser = await User.create(mockUser);
        const response = await request(server).post('/api/user/register').send(newUser);
        expect(response.status).toBe(201);
        expect(newUser.email).toBe(newUserEmail);
        expect(newUser.username).toBe(newUsername);
        await mongoose.connection.db.dropCollection('users');
    });
    test('/api/user/login method-POST-postLoginUser should return 422', async () => {
        const newUsername = 'newuser';
        const mockUser = { username: 'newuser' };
        const newUser = await User.create(mockUser);
        const response = await request(server).post('/api/user/register').send(newUser);
        expect(response.status).toBe(422);
        await mongoose.connection.db.dropCollection('users');
    });
    test('/api/user method-GET-getAll should return 404', async () => {
        const response = await request(server).get('/api/user');
        expect(response.status).toBe(404);
    });
    test('/api/user/logged method-GET-getById should return 404', async () => {
        const response = await request(server).get('/api/user/logged');
        expect(response.status).toBe(404);
    });
    test('/api/user/logged method-PUT-put should return 404', async () => {
        const mockUser = { username: 'user', email: 'user@email.com', password: '123' };
        const newUser = await User.create(mockUser); 
        const response = await request(server).put('/api/user/logged').send(newUser);
        expect(response.status).toBe(404);
        await mongoose.connection.db.dropCollection('users');
    });
    test('/api/user/logged method-DELETE-deleteById should return 404', async () => {
        const response = await request(server).delete('/api/user/logged').set('Headers', 1);
        expect(response.status).toBe(404);
    });

    // Article tests
    test('/api/artile/get-articles/:flag/:activePage method-GET-getArticles should return 200 and a response', async () => {
        const mockArticle = { name: 'NYT: White House eyes 12 potential authors behind anonymous op-ed', 
                        url: 'https://www.cnn.com/2018/09/07/politics/trump-new-york-times-op-ed-suspects/index.html',
                        clickbait: '0' };
        const newArticle = await Article.create(mockArticle);
        const response = await request(server).get('/api/article/get-articles/0/1').send(newArticle);
        expect(response.status).toBe(200);
        expect(mockArticle.name).toBe(newArticle.name);
        expect(newArticle.clickbait).toBe(mockArticle.clickbait);
        await mongoose.connection.db.dropCollection('articles');
    });
    test('/api/artile/get/:id method-GET-getArticleId should return 404', async () => {
        const response = await request(server).get('/api/artile/get');
        expect(response.status).toBe(404);
    });
    test('/api/artile/topfive method-GET-getTopFive should return 404', async () => {
        const response = await request(server).get('/api/artile/topfive');
        expect(response.status).toBe(404);
    });
    test('/api/artile/NYT method-GET-getKey should return 200 and an article', async () => {
        const mockArticle = { name: 'NYT: White House eyes 12 potential authors behind anonymous op-ed', 
                        url: 'https://www.cnn.com/2018/09/07/politics/trump-new-york-times-op-ed-suspects/index.html',
                        clickbait: '0' };
        const newArticle = await Article.create(mockArticle);
        const response = await request(server).get('/api/article/NYT').send(newArticle);
        expect(response.status).toBe(200);
        expect(mockArticle.clickbait).toBe(newArticle.clickbait);
        await mongoose.connection.db.dropCollection('articles');
    });
});


// tests server's User and Article routes for authenticated users
describe('server for authenticated users', () => {
    let token;
    beforeAll((done) => {
        return mongoose
            .connect(
                'mongodb://127.0.0.1/goodnews-test',
                { useNewUrlParser: true }
            )
            .then(() => console.log('connected to db'))
            .then(() => {
                request(server).post('/api/user/register').send({username: 'user',password: 'pw'}).end((err, response) => {
                    // console.log(response);
                    token = response.body.token; // save the token!
                    done();
                });
            })
    });

    afterAll((done) => {
        return mongoose.disconnect(done);
    });
    test('/api/user method-GET-getAll should require authorization', () => {
        return request(server).get('/api/user').then((response) => {
            expect(response.status).toBe(404);
        });
    });
    test('/api/user method-GET-getAll responds with JSON and 403', () => {
        return request(server).get('/api/user').set('Authorization', `Bearer ${token}`)
        .then((response) => {
            expect(response.status).toBe(403);
            expect(response.type).toBe('application/json');
        });
    });
    test('/api/article/post-article method-POST-post ', () => {
        const mockArticle = { name: 'NYT: White House eyes 12 potential authors behind anonymous op-ed', 
                        url: 'https://www.cnn.com/2018/09/07/politics/trump-new-york-times-op-ed-suspects/index.html',
                        clickbait: '0' };
        const newArticle = Article.create(mockArticle); 
        return request(server).post('/api/article/post-article').set('Authorization', `Bearer ${token}`).send(newArticle)
        .then((response) => {
            expect(response.status).toBe(403);
            expect(response.type).toBe('application/json');
        });
    });
});