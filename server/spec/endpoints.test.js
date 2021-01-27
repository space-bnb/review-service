const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../', '../', '.env')});
const request = require('supertest');

// setup isolated test environment
// seed and drop db every time tests are run
const db = require('../db');
const { app, server} = require('../server');
const seeder = require('../db/data/seed');
const { ReviewData }= require('../db/models/Review');

const TESTDB = process.env.MONGO_URI_TEST;

afterAll(() => {
  server.close();
});

describe('server', () => {
 
  // seed db once before running tests
  beforeAll(async() => {
    await seeder.seedReviews(TESTDB);
    await db.connect(TESTDB);
  });

  // drop database after batch of tests are done
  afterAll(async() => {
    await seeder.deleteReviews(TESTDB);
    db.close();
  });

  describe('database', () => {
    it('should contain 100 records', async (done) => {
      const reviewData = await ReviewData.find({});
      expect(reviewData.length)
        .toBe(100);
      done();
    });
  
    it('should contain ids 1-100', async (done) => {
      const records = await ReviewData.find({}).sort('+workspaceId');
      const track = {};
      for (let i = 1; i <= 100; i++) {
        track[i] = 0;
      }
      records.forEach((record, i) => {
        track[record.workspaceId]++;
      })
      let pass = true;
      let count = 0;
      let keys = Array.from(Object.keys(track));
      keys.forEach(i => {
        if (track[i] === 0) {
          pass = false;
          count++;
        }
      });
      expect(count)
        .toBe(0);
      expect(pass)
        .toBe(true);
      done();
    });
  });

  describe('endpoints', () => {

    describe('/api/reviews-api/info/:workspaceId', () => {

      it('should return correct review info by id', async (done) => {
        const testId = 4;
        const review = await ReviewData.findOne({workspaceId: testId});
        request(app)
          .get(`/api/reviews-api/info/${testId}`)
          .end((err, res) => {
            if (err) done(err);
            const{ body } = res;
            expect(body.reviewCount)
              .toBe(review.reviewCount);
            expect(body.avg)
              .toBe(review.avg);
            done();
          });
      });

      it('should return a status 404 for non-existant ids', (done) => {
        const testId = 1000;
        request(app)
          .get(`/api/reviews-api/info/${testId}`)
            .end((err, res) => {
              if (err) done(err);
              const { body } = res;
              expect(body.status).toBe(404);
              done();
            })
        
      });

    });

    describe('/api/reviews-api/all/:workspaceId',() => {

      it('should return reviews for the given id', async (done) => {

        const testId = 88;
        const { reviews } = await ReviewData.findOne({workspaceId: testId});
        request(app)
          .get(`/api/reviews-api/all/${testId}`)
          .end((err, res) => {
            if (err) done(err);
            const { body } = res;
            expect(body.reviews.length)
              .toBe(reviews.length);
            done();
          });

      });
      
      it('should return a 404 for a non-existant id', (done) => {
        const testId = 744;
        request(app)
          .get(`/api/reviews-api/all/${testId}`)
          .end((err, res) => {
            if (err) done(err);
            const { body } = res;
            expect(body.status)
              .toBe(404);
            done();
          })
      });
 
    });

    it('should return a 404 for a non-existant route', (done) => {
      request(app)
        .get('/api/not-a-route')
        .end((err, res) => {
          if (err) done(err);
          expect(res.body.status).toBe(404);
          done();
        })
    });

  });
});


