const express = require("express");
const app = express();
const router = express.Router();
const userRegister = require("../controllers/userController/userRegister");
const userLogin = require("../controllers/userController/userLogin");
const userVerify = require("../controllers/userController/userVerify");
const userAuthenticate = require("../middlewares/userAuth/userAuth");

router.post("/user/signup", userRegister);
router.post("/user/login", userLogin);
router.get("/user/verify", userVerify);
router.get("/user-auth", userAuthenticate);

module.exports = router;
