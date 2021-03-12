require('../db/index');
require('../db/relationships');
const request = require('supertest');
const app = require('../server');
const User = require('../db/models/User');
const httpResponses = require('../constants/httpResponses');
const validationResponses = require('../constants/validationResponses');
const Review = require('../db/models/Review');

let server;
let user_id;
let review_id;

beforeAll(async () => {
    const user = await User.create({
        first_name: 'Test',
        last_name: 'User',
        email: 'testuser@mail.com',
        password: 'password',
    });

    user_id = user.id;
    server = app.listen(5003, () => console.log('Test server started'));
});

afterAll(async () => {
    await server.close();
    await User.destroy({ where: { id: user_id } });
});

describe('/api/reviews/all/:space', () => {
    test('GET should reviews an array of reviews for the in the requests parameters', async () => {
        const res = await request(app).get('/api/reviews/all/1');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('reviews');
        expect(res.body.reviews[0]).toHaveProperty('rating');
        expect(res.body.reviews[0]).toHaveProperty('content');
        expect(res.body.reviews[0]).toHaveProperty('date');
        expect(res.body.reviews[0]).toHaveProperty('user');
        expect(res.body.reviews[0].user).toHaveProperty('first_name');
        expect(res.body.reviews[0].user).toHaveProperty('last_name');
    });

    test('POST should create a new review', async () => {
        const review = { rating: 5, content: 'Here is a new review' };
        const res = await request(app).post('/api/reviews/all/1').send(review).set('user_id', user_id);

        review_id = res.body.id; // for PUT test

        expect(res.status).toBe(201);
        expect(res.body.rating).toBe(5);
        expect(res.body.content).toBe('Here is a new review');
    });

    test('POST should NOT create a new review without the user_id', async () => {
        const review = { rating: 5, content: 'Here is a new review' };
        const res = await request(app).post('/api/reviews/all/1').send(review);

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ message: httpResponses.notLoggedIn });
    });

    test('POST should NOT create a new review with a missing rating property', async () => {
        const review = { content: 'Here is a new review' };
        const res = await request(app).post('/api/reviews/all/1').send(review).set('user_id', user_id);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error[1].msg).toBe(validationResponses.rating);
    });

    test('POST should NOT create a new review with a missing content property', async () => {
        const review = { rating: 4 };
        const res = await request(app).post('/api/reviews/all/1').send(review).set('user_id', user_id);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error[0].msg).toBe(validationResponses.review);
    });

    test('PUT should update a review', async () => {
        const reviewBeforeUpdate = await Review.findByPk(review_id);
        expect(reviewBeforeUpdate.rating).toBe(5);
        expect(reviewBeforeUpdate.content).toBe('Here is a new review');

        const updatedReview = { id: review_id, rating: 1, content: 'Updated review' };
        const res = await request(app).put('/api/reviews/all/1').send(updatedReview).set('user_id', user_id);
        expect(res.status).toBe(204);

        const reviewAfterUpdate = await Review.findByPk(review_id);
        expect(reviewAfterUpdate.rating).toBe(1);
        expect(reviewAfterUpdate.content).toBe('Updated review');
    });

    test('DELETE should delete a review', async () => {
        const res = await request(app).delete('/api/reviews/all/1').send({ id: review_id }).set('user_id', user_id);
        expect(res.status).toBe(204);

        const reviewAfterDelete = await Review.findByPk(review_id);
        expect(reviewAfterDelete).toBeNull();
    });
});
