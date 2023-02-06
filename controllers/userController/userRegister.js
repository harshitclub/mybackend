const User = require("../../models/userSchema");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const userRegister = async (req, res) => {
  // email verification function-----------------------------

  const sendVerifyMail = async (name, email, userId) => {
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
        subject: "LMS Verification Link", // Subject line
        html: `<html>
      <body>
      <h1>Learning Hat</h1>
      <h2>Hi, ${name}</h2>
      <h3>Verify Your Email Address To Complete Activation and Verification for Learning Hat Account.</h3>
      <p>Click On Below Button To Verify and Activate Your Learning Hat Account.</p>
      <a href="http://localhost:8080/user/verify?id=${userId}"><button>Click Here</button></a>
      </body>
      </head>
      </html>
      `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email Has Been Sent - `, info.response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------------------------------------------

  // ------------------------------------------------------------------

  const {
    name,
    email,
    username,
    phone,
    gender,
    status,
    company,
    position,
    country,
    profile,
    admin,
    password,
    cpassword,
  } = req.body;

  if (
    !name ||
    !email ||
    !username ||
    !phone ||
    !gender ||
    !status ||
    !company ||
    !position ||
    !country ||
    !admin ||
    !password ||
    !company
  ) {
    res.status(422).json({ error: "Fill All The Details!" });
  }

  try {
    const preUser = await User.findOne({ email });
    if (preUser) {
      res.status(422).json({ error: "User Already Registered!" });
    } else if (password !== cpassword) {
      res
        .status(422)
        .json({ error: "Password and Confirm Password Not Matching!" });
    } else {
      const finalUser = new User({
        name,
        email,
        username,
        phone,
        gender,
        status,
        company,
        position,
        country,
        admin,
        profile,
        password,
        cpassword,
      });

      //   hashing the password
      const salt = await bcrypt.genSalt(10);
      finalUser.password = await bcrypt.hash(password, salt);
      finalUser.cpassword = await bcrypt.hash(cpassword, salt);
      const storeUser = await finalUser.save();

      // sending the verification email to user mail
      sendVerifyMail(req.body.name, req.body.email, storeUser._id);
    }
    res.status(201).json({
      status: "201",
      message:
        "User Account Created Successfully, Verification Email Has Been Sent To Your Mail.",
    });
  } catch (error) {
    console.log(error);
    console.log("Catch Block Error While Registering User!");
  }
};

module.exports = userRegister;
