const express = require("express");
const router = express.Router();
const adminRegister = require("../controllers/adminController/adminRegister");
const adminLogin = require("../controllers/adminController/adminLogin");
const adminVerify = require("../controllers/adminController/adminVerify");
const adminUsers = require("../controllers/adminController/adminUsers");
const adminCourses = require("../controllers/adminController/adminCourses");

router.post("/admin/signup", adminRegister);
router.post("/admin/login", adminLogin);
router.get("/admin/verify", adminVerify);
router.get("/get/users", adminUsers);
router.get("/get/courses", adminCourses);

module.exports = router;
