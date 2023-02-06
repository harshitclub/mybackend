const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating course schema
const courseSchema = new Schema({
  courseFullTitle: {
    type: String,
    required: [true, "Please Enter Course Name"],
    trim: true,
  },
  courseShortTitle: {
    type: String,
    required: [true, "Please Enter Course Name"],
    trim: true,
  },
  courseIdNumber: {
    type: String,
    require: [true, "Please Enter Course Code"],
  },
  courseStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
    required: true,
  },
  courseDuration: {
    type: String,
    required: true,
  },
  courseLanguage: {
    type: String,
    required: true,
  },
  courseFormat: {
    type: String,
    required: true,
  },
  courseTeacher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    require: [true, "Please Enter Description"],
  },
  admin: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("course", courseSchema);
