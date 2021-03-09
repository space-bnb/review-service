const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const { ReviewData } = require('../db/models/Review');

let server;

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_DEV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    server = app.listen(5003, () => console.log('Test server started'));
});

afterAll(async () => {
    await server.close();
    await mongoose.disconnect();
});

describe('/api/reviews/all/:workspaceId', () => {
    test('GET should get and object with a reviews property that is an array of review objects', async () => {
        const res = await request(app).get('/api/reviews/all/1');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('reviews');
        expect(res.body.reviews[0]).toHaveProperty('date');
        expect(res.body.reviews[0]).toHaveProperty('rating');
        expect(res.body.reviews[0]).toHaveProperty('content');
        expect(res.body.reviews[0]).toHaveProperty('parentId');
    });

    test('POST should create a new review', async () => {
        const review = {
            author: 'Dane Murphy',
            date: '2021-03-06T19:23:56.344Z',
            rating: 5,
            content: 'This is a new review being added to a ReviewData',
            parentId: '6043d6cc8b822c00a5ea3342',
        };

        const res = await request(app).post('/api/reviews/all/1').send(review);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body).toHaveProperty('date');
        expect(res.body).toHaveProperty('rating');
        expect(res.body).toHaveProperty('content');
        expect(res.body).toHaveProperty('parentId');
    });

    test('PUT should update an existing review record', async () => {
        const reviewData = await ReviewData.findOne({ workspaceId: 1 });

        const review = {
            _id: reviewData.reviews[reviewData.reviews.length - 1]._id,
            author: 'Dane Murphy',
            date: '2021-03-06T19:23:56.344Z',
            rating: 1,
            content: 'This is a new review being updated',
            parentId: '6043d6cc8b822c00a5ea3342',
        };

        expect(reviewData.reviews[reviewData.reviews.length - 1].rating).not.toBe(1);
        await request(app).put('/api/reviews/all/1').send(review);

        const updatedReviewData = await ReviewData.findOne({ workspaceId: 1 });
        const updatedReview = updatedReviewData.reviews[updatedReviewData.reviews.length - 1];

        expect(updatedReview._id).toEqual(review._id);
        expect(updatedReview.author).toBe(review.author);
        expect(updatedReview.date.toISOString()).toBe(review.date);
        expect(updatedReview.rating).toBe(review.rating);
        expect(updatedReview.content).toBe(review.content);
        expect(String(updatedReview.parentId)).toBe(review.parentId);
    });

    test('DELETE should delete a single review', async () => {
        const reviewData = await ReviewData.findOne({ workspaceId: 1 });
        const reviewId = reviewData.reviews[reviewData.reviews.length - 1]._id;

        const res = await request(app).delete('/api/reviews/all/1').send({ reviewId });
        const reviewDataAfterDelete = await ReviewData.findOne({ workspaceId: 1 });

        expect(res.status).toBe(204);
        expect(reviewData.reviews.length - reviewDataAfterDelete.reviews.length).toBe(1);
    });
});
