const User = require("../../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res) => {
  const JWTSECRET = process.env.JWTSECTRET;

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "Fill All The Details!" });
  }

  try {
    const validUser = await User.findOne({ email });

    if (validUser) {
      const userMatch = await bcrypt.compare(password, validUser.password);
      if (!userMatch) {
        res.status(422).json({ error: "Invalid Credentials!" });
      }
      const payload = {
        _id: validUser._id,
        name: validUser.name,
        company: validUser.company,
        role: validUser.role,
      };

      let token = jwt.sign(payload, JWTSECRET, {
        expiresIn: "1d",
      });
      res.cookie("userCookie", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      });
      res.status(201).json({ status: "201", token });
    }
  } catch (error) {
    res.status(401).json({ message: "Catch Block Error While Try To Login!" });
  }
};

module.exports = userLogin;
