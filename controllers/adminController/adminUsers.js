const User = require("../../models/userSchema");

const adminUsers = async (req, res) => {
  try {
    const users = await User.find({ admin: "gautamharshit41@gmail.com" });
    // console.log(users);
    res.status(200).json({ status: "200", data: users });
  } catch (error) {
    console.log(error);
  }
};

module.exports = adminUsers;
