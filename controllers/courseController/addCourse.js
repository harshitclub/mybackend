const Course = require("../../models/courseSchema");

const addCourse = async (req, res) => {
  const {
    courseFullTitle,
    courseShortTitle,
    courseIdNumber,
    courseStatus,
    courseDuration,
    courseLanguage,
    courseFormat,
    courseTeacher,
    description,
  } = req.body;

  if (
    !courseFullTitle ||
    !courseShortTitle ||
    !courseIdNumber ||
    !courseStatus ||
    !courseDuration ||
    !courseLanguage ||
    !courseFormat ||
    !courseTeacher ||
    !description
  ) {
    res.status(422).json({ error: "Fill All The Details" });
  }

  try {
    const preCourse = await Course.findOne({ courseIdNumber });
    if (preCourse) {
      res.status(422).json({ error: "Use Another Course Code!" });
    } else {
      const finalCourse = new Course({
        courseFullTitle,
        courseShortTitle,
        courseIdNumber,
        courseStatus,
        courseDuration,
        courseLanguage,
        courseFormat,
        courseTeacher,
        description,
      });
      const storeCourse = await finalCourse.save();
    }
    res
      .status(201)
      .json({ status: "201", message: "Course Created Successfully!" });
  } catch (error) {
    console.log(error);
    console.log("Catch Block Error While Adding Course");
  }
};

module.exports = addCourse;
