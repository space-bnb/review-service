const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const { noReviewData } = require('../constants/httpResponses');

let server;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_DEV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    server = app.listen(5002, () => console.log('Test server started'));
});

afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
});

describe('GET /api/reviews/info/:workspaceId', () => {
    test('should get review data with properties avg and reviewCount', async () => {
        const res = await request(app).get('/api/reviews/info/1');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('avg');
        expect(res.body).toHaveProperty('reviewCount');
    });

    test('should return statusCode 404 with error message if no data is found', async () => {
        const res = await request(app).get('/api/reviews/info/10000');

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('message');
        expect(res.body.message).toBe(noReviewData);
    });
});
