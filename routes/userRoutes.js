const express = require("express");
const app = express();
const router = express.Router();
const userRegister = require("../controllers/userController/userRegister");
const userLogin = require("../controllers/userController/userLogin");
const userVerify = require("../controllers/userController/userVerify");
const userUpdate = require("../controllers/userController/userUpdate");
const userDelete = require("../controllers/userController/userDelete");

router.post("/user/signup", userRegister);
router.post("/user/login", userLogin);
router.get("/user/verify", userVerify);
router.put("/:id", userUpdate);
router.delete("/:id", userDelete);

module.exports = router;
