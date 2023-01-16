const express = require("express");
const router = express.Router();
const addCourse = require("../controllers/courseController/addCourse");

router.post("/add/course", addCourse);

module.exports = router;
