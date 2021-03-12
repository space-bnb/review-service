require('../db/index');
require('../db/relationships');
const request = require('supertest');
const app = require('../server');
const User = require('../db/models/User');
// const { ReviewData } = require('../db/models/Review');

let server;
let user_id;

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
});
