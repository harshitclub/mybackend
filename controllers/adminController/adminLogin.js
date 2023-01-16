const Admin = require("../../models/adminSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const adminLogin = async (req, res) => {
  const sendLoginMail = async (name, email, userId) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: "harshitclub@gmail.com",
          pass: "vzzkqrmddvmzncqq",
        },
      });
      const mailOptions = {
        from: "harshitclub@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Learning Hat Login", // Subject line
        html: `<html>
        <body>
        <h3>Learning Hat Pvt. Ltd</h3>
        <p>Hi,<b> ${name}</b></p>
        <p>We wanted to let you know that your account was just accessed from a device. If you did not initiate this login, please contact our support team immediately to protect your account.</p>
        
        <p>Thank you,</p>
        <p>Learning Hat Support Team</p>
        </body>
        </head>
        </html>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const JWTSECRET = process.env.JWTSECTRET;

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "All Fields are Required!" });
  }

  try {
    const validAdmin = await Admin.findOne({ email });
    if (validAdmin) {
      const adminMatch = await bcrypt.compare(password, validAdmin.password);
      if (!adminMatch) {
        res.status(422).json({ error: "Invalid Credentials!" });
      }
      const payload = {
        _id: validAdmin._id,
        company: validAdmin.company,
        email: validAdmin.email,
        role: validAdmin.role,
      };

      let token = jwt.sign(payload, JWTSECRET, {
        expiresIn: "1d",
      });

      res.cookie("adminCookie", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      });

      res.status(201).json({ status: "201" });
      // sendLoginMail(validAdmin.company, req.body.email, validAdmin._id);
    }
  } catch (error) {
    res.status(401).json({ message: "Catch Block Error While Try To Login!" });
  }
};

module.exports = adminLogin;
