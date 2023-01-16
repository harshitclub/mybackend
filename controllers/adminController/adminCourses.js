const Course = require("../../models/courseSchema");

const adminCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ status: "200", data: courses });
  } catch (error) {
    console.log(error);
  }
};

module.exports = adminCourses;
