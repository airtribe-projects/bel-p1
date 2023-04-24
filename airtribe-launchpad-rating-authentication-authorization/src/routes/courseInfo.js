const courseRoutes = require('express').Router();
const courseData = require('../courses.json');
const validator = require('../helpers/validator');
const bodyParser = require('body-parser');
const verifyToken = require('../middleware/authJWT');
const path = require('path');
const fs = require("fs");

courseRoutes.use(bodyParser.urlencoded({ extended: false }));
courseRoutes.use(bodyParser.json());


courseRoutes.get('/:courseId/averageRating',  (req, res) => {
  let kalviumCourse = courseData.kalvium;
  let courseIdPassed = req.params.courseId;

  let result = kalviumCourse.filter(val => val.courseId == courseIdPassed);

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
      let filteredCourseData = courseDataModified.kalvium.filter(course => course.courseId == courseIdPassed);

      let currentAverageRating = filteredCourseData[0].averageRating;
      let studentsVoted = filteredCourseData[0].studentsVoted;
      let modifiedAverageRating = ((currentAverageRating * studentsVoted) + ratingPassed.rating)/(studentsVoted+1);

      for(const course of courseDataModified.kalvium) {
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

courseRoutes.post('/', verifyToken, (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send({
        message: "Invalid JWT token"
      });
  } else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message
    });
  }
  const courseDetails = req.body;
  let writePath = path.join(__dirname, '..', 'courses.json');
  if(validator.validateCourseInfo(courseDetails, courseData).status) {
    let courseDataModified = JSON.parse(JSON.stringify(courseData));
    courseDataModified.kalvium.push(courseDetails);
    fs.writeFileSync(writePath, JSON.stringify(courseDataModified), {encoding:'utf8', flag:'w'});
    res.status(200);
    res.json(validator.validateCourseInfo(courseDetails, courseData));
  } else {
    res.status(400);
    res.json(validator.validateCourseInfo(courseDetails, courseData))
  }
});

courseRoutes.get('/', verifyToken, (req, res) => {
  if (!req.user && req.message == null) {
    res.status(403).send({
        message: "Invalid JWT token"
      });
  }
  else if (!req.user && req.message) {
    res.status(403).send({
      message: req.message
    });
  }
  res.status(200);
  res.send(courseData);
});

courseRoutes.get('/:courseId', (req, res) => {
  let kalviumCourse = courseData.kalvium;
  let courseIdPassed = req.params.courseId;
  let result = kalviumCourse.filter(val => val.courseId == courseIdPassed);

  res.status(200);
  res.send(result);
})

module.exports = courseRoutes;