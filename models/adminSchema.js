const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;

// creating admin schema
const adminSchema = new Schema({
  company: {
    type: String,
    required: [true, "Please Enter Company Name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please Company Email Address"],
    validate: [validator.isEmail, "Please Enter Valid Email Address"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please Enter Company Office Address"],
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, "Please Enter Company Phone Number"],
    unique: true,
    maxLength: 10,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  uploadProfile: {
    type: String,
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

module.exports = mongoose.model("admin", adminSchema);
