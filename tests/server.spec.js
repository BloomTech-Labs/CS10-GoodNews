require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const server = require('../server');
const User = require('../User/User');
const Article = require('../Article/Article');
const MongodbMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongod = new MongodbMemoryServer();

// tests server's User and Article routes
describe('server tests', () => {
    beforeAll(async () => {
      const uri = await mongod.getConnectionString();
      await mongoose.connect(uri, { useNewUrlParser: true });
    });

    beforeEach( async () => {
      const testUser = new User({ username: 'bob', email: 'bob@email.com', password: '123' })
      await testUser.save()
      const testArticle = new Article({
        id: '0',
        name: 'Kavanaugh seeks new tone after Supreme Court fight; Trump apologizes for process', 
        url: 'https://www.reuters.com/article/us-usa-court-kavanaugh/kavanaugh-seeks-new-tone-after-supreme-court-fight-trump-apologizes-for-process-idUSKCN1MI2DN?feedType=RSS&feedName=domesticNews',
        clickbait: '0',
        keywords: ['kavanaugh'],
        timestamp: new Date(Date.now())
      })
      await testArticle.save()
    })

    afterEach(async () => {
      await User.deleteMany()
      await Article.deleteMany()
    })

    afterAll(async () => {
      mongoose.disconnect()
      mongod.stop()
    });

    // User Tests
    test('/api/user/register method-POST-postRegister should return 201', async () => {
        const newUserEmail = 'user@email.com';
        const newUsername = 'user';
        const mockUser = { username: 'user', email: 'user@email.com', password: '123' };
        const response = await request(server).post('/api/user/register').send(mockUser);
        expect(response.status).toBe(201);
        expect(response.body.user.username).toBe(newUsername);
    });
    test('/api/user/login method-POST-postRegister should return 422 with no password', async () => {
        const mockUser = { username: 'newuser' };
        const response = await request(server).post('/api/user/register').send(mockUser);
        expect(response.status).toBe(422);
    });
    test('/api/user/login method-POST-postLoginUser should return 422 with no password', async () => {
        const mockUser = { username: 'newuser' };
        const response = await request(server).post('/api/user/login').send(mockUser);
        expect(response.status).toBe(422);
    });
    test('/api/user/login method-POST-postLoginUser should return 200 and user token', async () => {
        const testUser = await User.findOne({username: 'bob'});
        const mockUser = { username: 'bob', password: '123' };
        const registerResponse = await request(server).post('/api/user/register').send(testUser);
        const loginResponse = await request(server).post('/api/user/login').send(mockUser);
        expect(loginResponse.status).toBe(200);
        const token = loginResponse.body.token;
        // token should not be undefined or null
        expect.anything(token);
    });
    test('/api/user method-GET-getAll should return 404', async () => {
        const response = await request(server).get('/api/user');
        expect(response.status).toBe(404);
    });
    test('/api/user method-GET-getAll should return 200 when logged in', async () => {
        const testUser = await User.findOne({username: 'bob'});
        const registerResponse = await request(server).post('/api/user/register').send(testUser);
        const token = registerResponse.body.token;
        const userid = registerResponse.body.user._id;
        const response = await request(server).get('/api/user').set('authorization', token).set('userid', userid);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    test('/api/user/logged method-GET-getById should return 404', async () => {
        const response = await request(server).get('/api/user/logged');
        expect(response.status).toBe(404);
    });
    test('/api/user/logged method-GET-getById should return 200 and user when logged in', async () => {
        const testUser = await User.findOne({username: 'bob'});
        const registerResponse = await request(server).post('/api/user/register').send(testUser);
        const token = registerResponse.body.token;
        const userid = registerResponse.body.user._id;  
        const response = await request(server).get('/api/user/logged').set('authorization', token).set('userid', userid);
        expect(response.status).toBe(200);
        expect(response.body.username).toBe(testUser.username);
    });
    test('/api/user/logged method-PUT-put should return 404 when not logged in', async () => {
        const mockUser = { username: 'user', email: 'user@email.com', password: '123' };
        const response = await request(server).put('/api/user/logged').send(mockUser);
        expect(response.status).toBe(404);
    });
    test('/api/user/logged method-PUT-put should return 201 and updated user when logged in', async () => {
        const testUser = await User.findOne({username: 'bob'});
        const registerResponse = await request(server).post('/api/user/register').send(testUser);
        const token = registerResponse.body.token;
        const userid = registerResponse.body.user._id;
        const mockUser = { username: 'user' };
        const response = await request(server).put('/api/user/logged')
          .set('authorization', token).set('userid', userid).send(mockUser);
        expect(response.status).toBe(201);
        expect(response.body.username).toBe(mockUser.username);
    });
    test('/api/user/logged method-DELETE-deleteById should return 404 if not logged in', async () => {
        const response = await request(server).delete('/api/user/logged').set('Headers', 1);
        expect(response.status).toBe(404);
    });

    // Article tests
    test('/api/article/post-article method-POST-post returns status 201', async () => {
        // log in
        const testUser = await User.findOne({username: 'bob'});
        const registerResponse = await request(server).post('/api/user/register').send(testUser);
        const token = registerResponse.body.token;
        const userid = registerResponse.body.user._id;

        // post article
        const testArticle = { id: '1', name: 'test', clickbait: '0', url: 'url' }
        const response = await request(server).post('/api/article/post-article')
          .set('authorization', token).set('userid', userid).send(testArticle);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(testArticle.name);
    });
    test('/api/article/get-articles/:flag/:activePage method-GET-getArticles should return 200 and a response', async () => {
        const testArticle = await Article.findOne();
        const response = await request(server).get('/api/article/get-articles/0/1');
        expect(response.status).toBe(200);
        expect(response.body[0].name).toBe(testArticle.name);
        expect(response.body[0].clickbait).toBe(testArticle.clickbait);
    });
    test('/api/article/get/:id method-GET-getArticleId should return 404 if not valid id', async () => {
        const response = await request(server).get('/api/article/get/id');
        expect(response.status).toBe(404);
    });
    test('/api/article/get/:id method-GET-getArticleId should return 200 and article', async () => {
        const testArticle = await Article.findOne();
        const id = testArticle._id;
        const response = await request(server).get(`/api/article/get/${id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(testArticle.name);
    });
    test('/api/article/topfive method-GET-getTopFive should return 200 and include kavanaugh', async () => {
        const response = await request(server).get('/api/article/topfive');
        expect(response.status).toBe(200);
        console.log(response.body)
        expect(response.body[0]._id.keyword).toBe('kavanaugh');
    });
    test('/api/article/kavanaugh method-GET-getKey should return 200 and an article', async () => {
        const testArticle = await Article.findOne();
        const response = await request(server).get('/api/article/kavanaugh');
        expect(response.status).toBe(200);
        expect(response.body[0].name).toBe(testArticle.name);
        expect(response.body[0].clickbait).toBe(testArticle.clickbait);
    });
    test('/api/user method-GET-getAll should require authorization', () => {
      return request(server).get('/api/user').then((response) => {
          expect(response.status).toBe(404);
      });
    });
    test('/api/user method-GET-getAll responds with JSON and 403', () => {
        const badToken = 'abc'
        return request(server).get('/api/user').set('authorization', badToken)
        .then((response) => {
            expect(response.status).toBe(403);
            expect(response.type).toBe('application/json');
        });
    });
});