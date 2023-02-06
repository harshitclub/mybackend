const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

// creating user schema
const userSchema = new Schema({
  name: {
    type: String,
    require: [true, "Please Enter Your Name"],
    trim: true,
  },
  email: {
    type: String,
    require: [true, "Please Enter Your Email Address"],
    validate: [validator.isEmail, "Please Enter Valid Email Address"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    require: [true, "Please Enter Your Phone Number"],
    unique: true,
    maxLength: 10,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: true,
  },
  company: {
    type: String,
    require: [true, "Please Enter Your Company"],
    trim: true,
  },
  position: {
    type: String,
    require: [true, "Please Enter Your Position In Company"],
    trim: true,
  },
  role: {
    type: String,
    default: "user",
  },
  country: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
    minLength: 8,
  },
  cpassword: {
    type: String,
    require: true,
    minLength: 8,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user", userSchema);

// make a field of admin
