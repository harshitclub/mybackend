const User = require("../../models/userSchema");
const bcrypt = require("bcryptjs");

const userUpdate = async (req, res) => {
  const id = req.params.id;
  const { email, password, cpassword } = req.body;
  if (!email || !password || !cpassword) {
    res.status(422).json({ error: "Fill All The Details!" });
  }
  const hashPassword = bcrypt.hashSync(password);
  const hashCpassword = bcrypt.hashSync(cpassword);
  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      email: email,
      password: hashPassword,
      cpassword: hashCpassword,
    });
  } catch (error) {
    console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Something Went Wrong!" });
  }
  res.status(200).json({ message: "User Updated!" });
};

module.exports = userUpdate;
