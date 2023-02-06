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
    required: [true, "Please Enter Company Email Address"],
    validate: [validator.isEmail, "Please Enter Valid Email Address"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Please Enter Company Username"],
    trim: true,
  },
  business: {
    type: String,
    required: [true, "Please Enter Company Business"],
  },

  phone: {
    type: Number,
    required: [true, "Please Enter Company Phone Number"],
    unique: true,
    maxLength: 10,
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Please Enter Company Office Address"],
    trim: true,
  },
  city: {
    type: String,
    required: [true, "Please Enter Company City"],
  },
  state: {
    type: String,
    required: [true, "Please Enter Company State"],
  },
  country: {
    type: String,
    required: [true, "Please Enter Company Country"],
  },
  zip: {
    type: String,
    required: [true, "Please Enter Company Area Pin Code"],
  },
  gstin: {
    type: String,
    required: [true, "Please Enter Company GSTIN Number"],
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
