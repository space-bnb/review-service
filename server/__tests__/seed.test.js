const app = require('../server');
const mongoose = require('mongoose');
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

test('seed script should insert 100 records in the database (for now)', async () => {
    const AllReviewData = await ReviewData.find();

    expect(AllReviewData.length).toBe(100);
});
