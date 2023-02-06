const jwt = require("jsonwebtoken");
const User = require("../../models/userSchema");

const userAuthenticate = async (req, res, next) => {
  const JWTSECRET = process.env.USERJWTSECRET;

  const { userCookie } = req.cookies;
  if (!userCookie) {
    return res.status(400).json({ status: "400" });
  }

  const isUser = jwt.verify(userCookie, JWTSECRET);
  if (!isUser.role === "user") {
    return res.status(400).json({ status: "400" });
  }

  const userId = isUser._id;

  const userDetails = await User.findOne({ id: userId });

  return res.status(201).json({ status: "201", data: userDetails });

  next();
};

module.exports = userAuthenticate;
