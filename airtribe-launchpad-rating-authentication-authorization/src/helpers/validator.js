class validator {
  static validateCourseInfo(courseInfo, courseData) {
    if(courseInfo.hasOwnProperty("course") &&
      courseInfo.hasOwnProperty("courseId") &&
      courseInfo.hasOwnProperty("cohort") &&
      courseInfo.hasOwnProperty("college") &&
      courseInfo.hasOwnProperty("semester") &&
      courseInfo.hasOwnProperty("instructor") &&
      courseInfo.hasOwnProperty("averageRating") &&
      courseInfo.hasOwnProperty("studentsVoted") && this.validateUniqueCourseId(courseInfo, courseData)) {
        return {
          "status": true,
          "message": "Course has been added"
        };
      }
      if(!this.validateUniqueCourseId(courseInfo, courseData)){
        return {
          "status": false,
          "message": "Course id has to be unique"
        };
      }
      return {
        "status": false,
        "message": "Course Info is malformed please provide all the properties"
      }
  }

  static validateUniqueCourseId(courseInfo, courseData) {
    let valueFound = courseData.kalvium.some(el => el.courseId === courseInfo.courseId);
    if(valueFound) return false;
    return true;
  }

  static validateAverageRating(averageRating) {
    if(averageRating.hasOwnProperty("rating") && this.isInt(averageRating.rating)) {
      return true;
    }
    return false;
  }

  static isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
  }
}

module.exports = validator;