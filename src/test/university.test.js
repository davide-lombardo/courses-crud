const request = require('supertest');
const app = require('../app');
const University = require('../model/university');
const { dbConnection, dbDisconnection } = require('../config/dbConfig');
const { createDummyData, replaceFirstCharId } = require('./testmiddlewares');

let testId = null;
let modifiedTestId = null;

describe('University requests', () => {
  beforeAll(async () => {
    dbConnection();
    testId = await createDummyData(University);
    modifiedTestId = replaceFirstCharId(testId);
  });

  afterAll(() => {
    dbDisconnection();
  });

  describe('POST request', () => {
    afterAll(async () => {
      await University.deleteOne({ name: 'post test' });
    });
    describe('given a name', () => {
      it('should respond with a 201 status code and a json obj containing a message, the name and id', async () => {
        const response = await request(app).post('/api/universities/').send({
          name: 'post test',
        });
        expect(response.body.message).toBeDefined();
        expect(response.body.createdUniversity._id).toBeDefined();
        expect(response.body.createdUniversity.name).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(201);
      });
    });
    describe('name not provided', () => {
      it('should respond with a status code of 500 and a json obj containing a message', async () => {
        const response = await request(app).post('/api/universities/').send();
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(500);
      });
    });
    describe('name is not an alphanumeric value', () => {
      it('should respond with a 500 status code and a json obj containing a message', async () => {
        const response = await request(app)
          .post('/api/universities/')
          .send({ name: 'test$post' });
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(500);
      });
    });
  });
  describe('PATCH request', () => {
    describe('given a valid Id and a name', () => {
      it('should respond with a statuscode of 200 and a json obj containing a message and the modifiedObj', async () => {
        const response = await request(app)
          .patch(`/api/universities/${testId}`)
          .send({
            name: 'test patch',
          });
        expect(response.body.message).toBeDefined();
        expect(response.body.modifiedUniversity._id).toBeDefined();
        expect(response.body.modifiedUniversity.name).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
      });
    });
    describe('given an Id without a valid resource related', () => {
      it('should respond with a 404 status code and a json obj containing a message', async () => {
        const response = await request(app)
          .patch(`/api/universities/${modifiedTestId}`)
          .send({
            name: 'test 2',
          });
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
      });
    });
    describe('given a valid Id but name not provided', () => {
      it('should response with a status code of 500 and a json obj containing a message', async () => {
        const response = await request(app)
          .patch(`/api/universities/${testId}`)
          .send();
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(500);
      });
    });

    describe('given a valid Id but the name is not an alphanumeric value', () => {
      it('should respond with a 500 status code and a json obj containing a message', async () => {
        const response = await request(app)
          .patch(`/api/universities/${testId}`)
          .send({
            name: 'test£patch',
          });
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(500);
      });
    });
  });
  describe('DELETE  request', () => {
    describe('give a valid Id', () => {
      it('should respond with a 200 status code and a json obj containing a message and the deleted obj', async () => {
        const response = await request(app)
          .delete(`/api/universities/${testId}`)
          .send();
        expect(response.body.message).toBeDefined();
        expect(response.body.deletedUniversity._id).toBeDefined();
        expect(response.body.deletedUniversity.name).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
      });
    });
    describe('given an Id without a valid resource related', () => {
      it('should respond with a 404 status code and a json obj containing a message', async () => {
        const response = await request(app)
          .delete(`/api/universities/${modifiedTestId}`)
          .send();
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
      });
    });
  });
  describe('GET requests', () => {
    describe('get all universities', () => {
      describe('if university collection is empty', () => {
        it('should respond wth a 404 status code and a json obj containing a message', async () => {
          const response = await request(app).get('/api/universities/').send();
          expect(response.body.message).toBeDefined();
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(404);
        });
      });

      describe('If university collection has resources available', () => {
        beforeAll(async () => {
          testId = await createDummyData(University);
        });
        it('should respond with a 200 status code and a json obj containing count and university objs', async () => {
          const response = await request(app).get('/api/universities/').send();
          expect(response.body.count).toBeDefined();
          expect(response.body.university).toBeDefined();
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(200);
        });
      });
    });
    describe('get a single university', () => {
      describe('given a valid Id', () => {
        it('should respond with a 200 status code and a json obj containing id and name', async () => {
          const response = await request(app)
            .get(`/api/universities/${testId}`)
            .send();
          expect(response.body.university._id).toBeDefined();
          expect(response.body.university.name).toBeDefined();
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(200);
        });
      });
      describe('given an Id without a related resource', () => {
        it('should respond with a 404 status code and a json obj containing a message', async () => {
          const response = await request(app)
            .get(`/api/universities/${modifiedTestId}`)
            .send();
          expect(response.body.message).toBeDefined();
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(404);
        });
      });
    });
  });
});
