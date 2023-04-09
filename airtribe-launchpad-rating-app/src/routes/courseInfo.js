const courseRoutes = require('express').Router();
const courseData = require('../courses.json');
const validator = require('../helpers/validator');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require("fs");

courseRoutes.use(bodyParser.urlencoded({ extended: false }));
courseRoutes.use(bodyParser.json());


courseRoutes.get('/:courseId/averageRating', (req, res) => {
  let airtribeCourse = courseData.airtribe;
  let courseIdPassed = req.params.courseId;

  let result = airtribeCourse.filter(val => val.courseId == courseIdPassed);

  res.status(200);
  res.send({
      "averageRating" : result[0].averageRating,
      "courseId": courseIdPassed
    });
});

courseRoutes.post('/:courseId/averageRating', (req, res) => {
  let courseIdPassed = req.params.courseId;
  let ratingPassed = req.body;
  let writePath = path.join(__dirname, '..', 'courses.json');
  if(validator.validateAverageRating(ratingPassed)) {
      let courseDataModified = JSON.parse(JSON.stringify(courseData));
      let filteredCourseData = courseDataModified.airtribe.filter(course => course.courseId == courseIdPassed);

      let currentAverageRating = filteredCourseData[0].averageRating;
      let studentsVoted = filteredCourseData[0].studentsVoted;
      let modifiedAverageRating = ((currentAverageRating * studentsVoted) + ratingPassed.rating)/(studentsVoted+1);

      for(const course of courseDataModified.airtribe) {
        if(course.courseId == courseIdPassed) {
          course.averageRating = modifiedAverageRating;
          course.studentsVoted = course.studentsVoted + 1;
          break;
        }
      }
      console.log(courseDataModified);
      fs.writeFileSync(writePath, JSON.stringify(courseDataModified), {encoding:'utf8', flag:'w'});
      res.status(200).send({
        "message": `Average rating for the course ${courseIdPassed} has been modified`,
        "averageRating": modifiedAverageRating,
        "studentsVoted": studentsVoted + 1
      });
  } else {
    res.status(500);
    res.json({
      "message": `Failed to update the average rating for ${courseIdPassed}`
    });
  }
});

courseRoutes.post('/', (req, res) => {
  const courseDetails = req.body;
  let writePath = path.join(__dirname, '..', 'courses.json');
  if(validator.validateCourseInfo(courseDetails, courseData).status) {
    let courseDataModified = JSON.parse(JSON.stringify(courseData));
    courseDataModified.airtribe.push(courseDetails);
    fs.writeFileSync(writePath, JSON.stringify(courseDataModified), {encoding:'utf8', flag:'w'});
    res.status(200);
    res.json(validator.validateCourseInfo(courseDetails, courseData));
  } else {
    res.status(400);
    res.json(validator.validateCourseInfo(courseDetails, courseData))
  }
});

courseRoutes.get('/', (req, res) => {
  res.status(200);
  res.send(courseData);
});

courseRoutes.get('/:courseId', (req, res) => {
  let airtribeCourse = courseData.airtribe;
  let courseIdPassed = req.params.courseId;
  let result = airtribeCourse.filter(val => val.courseId == courseIdPassed);

  res.status(200);
  res.send(result);
})

module.exports = courseRoutes;