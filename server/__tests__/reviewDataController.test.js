const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const { noReviewData } = require('../constants/httpResponses');
const { ReviewData } = require('../db/models/Review');

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

describe('POST /api/reviews/info', () => {
    test('should create a new record for ReviewData', async () => {
        const reviewDataBeforePost = await ReviewData.find();
        const res = await request(app).post('/api/reviews/info');
        const reviewDataAfterPost = await ReviewData.find();

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('reviewCount');
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('workspaceId');
        expect(res.body).toHaveProperty('workspaceSlug');
        expect(res.body).toHaveProperty('reviews');
        expect(reviewDataAfterPost.length - reviewDataBeforePost.length).toBe(1);
    });
});
