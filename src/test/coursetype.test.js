const request = require('supertest');
const app = require('../app');
const { dbDisconnection, dbConnection } = require('../config/dbConfig');
const CourseType = require('../model/course-type');
const { createDummyData, replaceFirstCharId } = require('./testmiddlewares');

let testId = null;
let modifiedTestId = null;

describe('courseType requests', () => {
  beforeAll(async () => {
    dbConnection();
    testId = await createDummyData(CourseType);
    modifiedTestId = replaceFirstCharId(testId);
  });

  afterAll(() => {
    dbDisconnection();
  });

  describe('POST request', () => {
    afterAll(async () => {
      await CourseType.deleteOne({ name: 'post test' });
    });

    describe('given a name', () => {
      it('should respond with a json obj which contains id and name and a status code of 201', async () => {
        const response = await request(app).post('/api/courseTypes/').send({
          name: 'post test',
        });
        console.log(response.body);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBeDefined();
        expect(response.body.createdCourseType._id).toBeDefined();
        expect(response.body.createdCourseType.name).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
      });
    });

    describe('when the name is missing', () => {
      it('should respond with a 500 status code and a json obj containing a message', async () => {
        const response = await request(app).post('/api/courseTypes/').send({});
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(500);
      });
    });
    describe('name is not an alphanumeric value', () => {
      it('should send a 500 status code and a json obj with a message', async () => {
        const response = await request(app).post('/api/courseTypes/').send({
          name: 'test$post',
        });
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(500);
      });
    });
  });

  describe('PATCH request', () => {
    describe('given the id of the resource to modify and the new value for name in the body of the request', () => {
      it('should respond with a json obj containing a message, the id and the old name with a status code of 200', async () => {
        const response = await request(app)
          .patch(`/api/courseTypes/${testId}`)
          .send({
            name: 'test 2',
          });
        expect(response.body.message).toBeDefined();
        expect(response.body.modifiedCourseType._id).toBeDefined();
        expect(response.body.modifiedCourseType.name).toBeDefined();
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toContain('json');
      });
    });

    describe('given an id with no valid resources related', () => {
      it('should respond with json object containing a message and a status code of 404', async () => {
        const response = await request(app)
          .patch(`/api/courseTypes/${modifiedTestId}`)
          .send({
            name: 'test',
          });
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
      });
    });

    describe('given a valid Id but the name is missing in the request body', () => {
      it('should respond with a status code of 500 and a json obj containing a message', async () => {
        const response = await request(app)
          .patch(`/api/courseTypes/${testId}`)
          .send();
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(500);
      });
    });
    describe('given a valid Id but the name is not an alphanumeric value', () => {
      it('should respond with a 500 status code and a json obj containing a message', async () => {
        const response = await request(app)
          .patch(`/api/courseTypes/${testId}`)
          .send({
            name: 'test%patch',
          });
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(500);
      });
    });
  });

  describe('DELETE request', () => {
    describe('given a valid Id deletes the related resource', () => {
      it('should respond with a json object containing a message and the deleted resource with a status code of 200', async () => {
        const response = await request(app).delete(
          `/api/courseTypes/${testId}`
        );
        expect(response.body.message).toBeDefined();
        expect(response.body.deletedCourseType._id).toBeDefined();
        expect(response.body.deletedCourseType.name).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
      });
    });

    describe('given an Id with no valid resource related', () => {
      it('should respond with json object containing a message and a 404 status code', async () => {
        const response = await request(app).delete(
          `/api/courseTypes/${modifiedTestId}`
        );
        expect(response.body.message).toBeDefined();
        expect(response.header['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
      });
    });
  });

  describe('Get all course types', () => {
    describe('if the course type collection is empty', () => {
      it('should respond with a status code of 404 and a json obj containing a message', async () => {
        const response = await request(app).get('/api/courseTypes/');
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
      });
    });
    describe('if the course type collection has resources available', () => {
      beforeAll(async () => {
        testId = await createDummyData(CourseType);
      });
      it('should respond with a json object containing count and coursetype properties and a status code of 200', async () => {
        const response = await request(app).get(`/api/courseTypes/`);
        expect(response.body.count).toBeDefined();
        expect(response.body.courseType).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe('get one course type', () => {
    describe('given a valid Id', () => {
      it('should respond with a json object containing the id and the name and a status code of 200', async () => {
        const response = await request(app).get(`/api/courseTypes/${testId}`);
        expect(response.body._id).toBeDefined();
        expect(response.body.name).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(200);
      });
    });
    describe('given an ID with no valid resource related', () => {
      it('should respond with a json object containing a message and a 404 status code', async () => {
        const response = await request(app).get(
          `/api/courseTypes/${modifiedTestId}`
        );
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
      });
    });
  });
});
