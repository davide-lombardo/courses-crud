const request = require('supertest');
const app = require('../app');
const Course = require('../model/course');
const { dbConnection, dbDisconnection } = require('../config/dbConfig');
const {
  createDummyData,
  replaceFirstCharId,
  createDummyCourse,
} = require('./testmiddlewares');
const CourseType = require('../model/course-type');
const University = require('../model/university');

let courseTestId = null;
let courseTypeTestId = null;
let universityTestId = null;
let modifiedCourseTestId = null;
let modifiedCourseTypeTestId = null;
let modifiedUniversityTestId = null;

describe('course requests', () => {
  beforeAll(async () => {
    dbConnection();
    courseTypeTestId = await createDummyData(CourseType);
    universityTestId = await createDummyData(University);
    courseTestId = await createDummyCourse(
      Course,
      courseTypeTestId,
      universityTestId
    );
    modifiedCourseTestId = replaceFirstCharId(courseTestId);
    modifiedCourseTypeTestId = replaceFirstCharId(courseTypeTestId);
    modifiedUniversityTestId = replaceFirstCharId(universityTestId);
  });
  afterAll(() => {
    dbDisconnection();
  });
  describe('POST requests', () => {
    afterAll(async () => {
      await Course.deleteOne({ name: 'test post' });
    });
    describe('given a name, typeId and universityIds', () => {
      it('should respond with a 201 status code and a json obj containing a message and the created obj', async () => {
        const response = await request(app).post('/api/courses/').send({
          name: 'test post',
          typeId: courseTypeTestId,
          universityId: universityTestId,
        });
        expect(response.body.message).toBeDefined();
        expect(response.body.createdCourse._id).toBeDefined();
        expect(response.body.createdCourse.name).toBeDefined();
        expect(response.body.createdCourse.typeId).toBeDefined();
        expect(response.body.createdCourse.universityId).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(201);
      });
    });
    describe('if name or typeId or universityId are missing', () => {
      it('should send a 500 status code and a json object containing a message', async () => {
        const bodyRequests = [
          { name: 'test with only name' },
          { typeId: courseTypeTestId },
          { universityId: universityTestId },
          {
            name: 'test with name and typeId',
            typeId: courseTypeTestId,
          },
          {
            name: 'test with name and UniversityId',
            universityId: [universityTestId],
          },
          { typeId: courseTypeTestId, universityId: [universityTestId] },
          {},
        ];
        for (let body of bodyRequests) {
          const response = await request(app).post('/api/courses/').send(body);
          expect(response.body.message).toBeDefined();
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(500);
        }
      });
    });
    describe('name is not an alphanumeric value', () => {
      it('should send a 500 status code and a json obj containing a message', async () => {
        const response = await request(app).post('/api/courses/').send({
          name: 'test@post',
          typeId: courseTypeTestId,
          universityId: universityTestId,
        });
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(500);
      });
    });
  });
  describe('PATCH requests', () => {
    // describe('if at least one of name, typeId and universityId is specified in the body', () => {
    //   it('should respond with a status code pf 200 and send a json obj with a message and the modified obj', async () => {
    //     const bodyRequests = [
    //       { name: 'test with only name' },
    //       { typeId: courseTypeTestId },
    //       { universityId: universityTestId },
    //       {
    //         name: 'test with name and typeId',
    //         typeId: courseTypeTestId,
    //       },
    //       {
    //         name: 'test with name and UniversityId',
    //         universityId: [universityTestId],
    //       },
    //       { typeId: courseTypeTestId, universityId: [universityTestId] },
    //       {
    //         name: 'test with all keys',
    //         typeId: courseTypeTestId,
    //         universityId: universityTestId,
    //       },
    //     ];
    //     for (let body of bodyRequests) {
    //       const response = await request(app)
    //         .patch(`/api/courses/${courseTestId}`)
    //         .send(body);
    //       expect(response.body.message).toBeDefined();
    //       expect(response.body.modifiedCourse._id).toBeDefined();
    //       expect(response.body.modifiedCourse.name).toBeDefined();
    //       expect(response.body.modifiedCourse.typeId).toBeDefined();
    //       expect(response.body.modifiedCourse.universityId).toBeDefined();
    //       expect(response.headers['content-type']).toContain('json');
    //       expect(response.statusCode).toBe(200);
    //     }
    //   });
    // });
    describe('given an Id with no valid resource related', () => {
      it('should send back a message with a 404 status code and a json obj containing a message', async () => {
        const response = await request(app)
          .patch(`/api/courses/${modifiedCourseTestId}`)
          .send({
            name: 'patch test 2',
          });
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(404);
      });
    });
    describe('given a valid Id but the request body is empty', () => {
      it('should respond with a 500 status code and a json obj containing a message', async () => {
        const response = await request(app)
          .patch(`/api/courses/${courseTestId}`)
          .send();
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(500);
      });
    });
    describe('given an Id but the name in the request body is not an alphanumeric value', () => {
      it('should send a 500 status code and a json obj containing a message', async () => {
        const response = await request(app)
          .patch(`/api/courses/${courseTestId}`)
          .send({
            name: 'test$patch',
          });
        expect(response.body.message).toBeDefined();
        expect(response.headers['content-type']).toContain('json');
        expect(response.statusCode).toBe(500);
      });
    });
  });
  describe('DELETE requests', () => {
    // describe('given a valid Id', () => {
    //   it('should respond with a 200 status code and a json obj containing the deleted obj', async () => {
    //     const response = await request(app)
    //       .delete(`/api/courses/${courseTestId}`)
    //       .send();
    //     expect(response.body.message).toBeDefined();
    //     expect(response.body.deletedCourse._id).toBeDefined();
    //     expect(response.body.deletedCourse.name).toBeDefined();
    //     expect(response.body.deletedCourse.typeId).toBeDefined();
    //     expect(response.body.deletedCourse.universityId).toBeDefined();
    //     expect(response.headers['content-type']).toContain('json');
    //     expect(response.statusCode).toBe(200);
    //   });
    // });
    // describe('given an Id with no valid resource related', () => {
    //   it('should respond with a 404 status code and a json obj containing a message', async () => {
    //     const response = await request(app)
    //       .delete(`/api/courses/${modifiedCourseTestId}`)
    //       .send();
    //     expect(response.body.message).toBeDefined();
    //     expect(response.headers['content-type']).toContain('json');
    //     expect(response.statusCode).toBe(404);
    //   });
    // });
  });
  describe('GET requests', () => {
    describe('get all courses', () => {
      // describe('if the course collection is empty', () => {
      //   it('should respond with a 404 status code and a json obj containing a message', async () => {
      //     const response = await request(app).get('/api/courses/').send();
      //     expect(response.body.message).toBeDefined();
      //     expect(response.headers['content-type']).toContain('json');
      //     expect(response.statusCode).toBe(404);
      //   });
      // });
      describe('if the course collection has resources available', () => {
        beforeAll(async () => {
          courseTestId = await createDummyCourse(
            Course,
            courseTypeTestId,
            universityTestId
          );
        });
        it('should send back a 200 status code and a json obj containing count and course properties', async () => {
          const response = await request(app).get('/api/courses/').send();
          expect(response.body.count).toBeDefined();
          expect(response.body.course).toBeDefined();
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(200);
        });
      });
    });
    describe('get single course', () => {
      describe('given a valid Id', () => {
        it('should respond with a 200 status code and a json obj containing the id ,name ,typeid and universityid ', async () => {
          const response = await request(app)
            .get(`/api/courses/${courseTestId}`)
            .send();
          expect(response.body.course._id).toBeDefined();
          expect(response.body.course.name).toBeDefined();
          expect(response.body.course.typeId).toBeDefined();
          expect(response.body.course.universityId).toBeDefined();
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(200);
        });
      });
      describe('given an Id with no valid resource related', () => {
        it('should send back a 404 status code and json obj containing a message', async () => {
          const response = await request(app)
            .get(`/api/courses/${modifiedCourseTestId}`)
            .send();
          expect(response.body.message).toBeDefined();
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(404);
        });
      });
    });
    describe('get all courses of one university', () => {
      describe('given a valid Id', () => {
        it('should respond with a 200 status code and a json object containing count and course properties', async () => {
          const response = await request(app)
            .get(`/api/courses?universityId=${universityTestId}`)
            .send();
          expect(response.body.count).toBeDefined();
          expect(response.body.course).toBeDefined();
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(200);
        });
      });
      // describe('given an Id with no valid resource related', () => {
      //   it('should respond with a 404 code and a json obj with a message', async () => {
      //     const response = await request(app)
      //       .get(`/api/courses?universityId=${modifiedUniversityTestId}`)
      //       .send();
      //     expect(response.body.message).toBeDefined();
      //     expect(response.headers['content-type']).toContain('json');
      //     expect(response.statusCode).toBe(404);
      //   });
      // });
    });
    describe('get all courses of one type', () => {
      describe('given a valid Id', () => {
        it('should respond with a 200 status code and a json obj containing count and course properties', async () => {
          const response = await request(app)
            .get(`/api/courses?typeId${courseTypeTestId}`)
            .send();
          expect(response.body.count).toBeDefined();
          expect(response.body.course).toBeDefined();
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(200);
        });
      });
      // describe('given an Id with no valid resources related', () => {
      //   it('should respond with a 404 status code and a json obj containing count and course properties', async () => {
      //     const response = await request(app)
      //       .get(`/api/courses?typeId=${modifiedCourseTypeTestId}`)
      //       .send();
      //     expect(response.body.message).toBeDefined();
      //     expect(response.headers['content-type']).toContain('json');
      //     expect(response.statusCode).toBe(404);
      //   });
      // });
    });
    describe('get all course of one type in a university', () => {
      describe('given valid Ids', () => {
        it('should respond with a 200 status code and a json obj containing count and course properties', async () => {
          const response = await request(app)
            .get(
              `/api/courses?typeId=${courseTypeTestId}&universityId=${universityTestId}`
            )
            .send();
          expect(response.body.count).toBeDefined();
          expect(response.body.course).toBeDefined();
          expect(response.headers['content-type']).toContain('json');
          expect(response.statusCode).toBe(200);
        });
      });
      // describe('given Ids with no valid resources related', () => {
      //   it('should respond with a 404 status code and json obj containing a message', async () => {
      //     idPairs = [
      //       {
      //         type: courseTypeTestId,
      //         university: modifiedUniversityTestId,
      //       },
      //       { type: modifiedCourseTypeTestId, university: universityTestId },
      //       {
      //         type: modifiedCourseTypeTestId,
      //         university: modifiedUniversityTestId,
      //       },
      //     ];
      //     for (let ids of idPairs) {
      //       const response = await request(app)
      //         .get(`/api/courses?typeId=${ids.type}&universityId=${ids.university}`)
      //         .send();
      //       expect(response.statusCode).toBe(404);
      //       expect(response.body.message).toBeDefined();
      //       expect(response.headers['content-type']).toContain('json');
      //     }
      //   });
      // });
    });
  });
});
