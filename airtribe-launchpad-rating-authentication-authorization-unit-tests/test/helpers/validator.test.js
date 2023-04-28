const expect = require('chai').expect;
const validator = require('../../src/helpers/validator');
const courseData = require('../../src/courses.json');
let courseDetails = {
  "course": "test",
  "courseId": 22,
  "cohort": 1,
  "college": "Lovely professional university",
  "semester": 2,
  "instructor": "Pawan Panjwani",
  "averageRating": 0,
  "studentsVoted": 0
}

describe('Testing the validator', function () {
  it('1. Validating the course info', function (done) {
    let response = validator.validateCourseInfo(courseDetails, courseData);
    expect(response.status).equal(true);
    expect(response.message).equal("Course has been added");
    done();
  });

  it('2. Validating the unique course id', function (done) {
    courseDetails.courseId = 10;
    let response = validator.validateCourseInfo(courseDetails, courseData);
    expect(response.status).equal(false);
    expect(response.message).equal("Course id has to be unique");
    done();
  });

  it('3. Validating the existence of all the fields in the course details', function(done) {
    delete courseDetails['cohort'];
    courseDetails.courseId = 40;
    let response = validator.validateCourseInfo(courseDetails, courseData);
    expect(response.status).equal(false);
    expect(response.message).equal("Course Info is malformed please provide all the properties");
    done();
  });
});

describe('Validate the course id', function () {
  it('asserts that course id is not valid', function(done) {
    courseDetails.courseId = 10;
    let response = validator.validateUniqueCourseId(courseDetails, courseData);
    expect(response).equal(false);
    done();
  });

  it('validates the course id', function(done) {
    courseDetails.courseId = 50;
    let response = validator.validateUniqueCourseId(courseDetails, courseData);
    expect(response).equal(true);
    done();
  });
});


describe('Validates the average rating', function () {
  it('asserts that course rating is present and rating is integer', function(done) {
    let averageRating = {'rating' : 10};
    let response = validator.validateAverageRating(averageRating);
    expect(response).equal(true);
    done();
  });

  it('validates the course rating is not present', function(done) {
    let averageRating = {'averageRating' : 10};
    let response = validator.validateAverageRating(averageRating);
    expect(response).equal(false);
    done();
  });

  it('validates the course rating is an integer', function(done) {
    let averageRating = {'rating' : undefined};
    let response = validator.validateAverageRating(averageRating);
    expect(response).equal(false);
    done();
  });
});