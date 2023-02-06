const jwt = require("jsonwebtoken");
const Admin = require("../../models/adminSchema");

const adminAuthenticate = async (req, res, next) => {
  const JWTSECRET = process.env.ADMINJWTSECRET;

  const { adminCookie } = req.cookies;
  if (!adminCookie) {
    return res.status(400).json({ status: "400" });
  }

  const isAdmin = jwt.verify(adminCookie, JWTSECRET);

  if (!isAdmin.role === "admin") {
    return res.status(400).json({ status: "400" });
  }

  const adminEmail = isAdmin.email;

  try {
    const adminDetails = await Admin.findOne({ email: adminEmail });

    return res.status(201).json({ status: "201", data: adminDetails });
  } catch (error) {
    console.log(error);
  }

  next();
};

module.exports = adminAuthenticate;
