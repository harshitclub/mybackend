const User = require("../../models/userSchema");

const userDelete = async (req, res) => {
  const id = req.params.id;

  try {
    let user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = userDelete;
