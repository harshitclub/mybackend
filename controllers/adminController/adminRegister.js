const Admin = require("../../models/adminSchema");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const adminRegister = async (req, res) => {
  // email verification function
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
        <a href="http://localhost:8080/admin/verify?id=${userId}"><button>Click Here</button></a>
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

  const { company, email, address, phone, website, password, cpassword } =
    req.body;

  if (!company || !email || !address || !phone || !password || !cpassword) {
    res.status(422).json({ error: "Fill All The Details" });
  }

  try {
    const preAdmin = await Admin.findOne({ email });
    if (preAdmin) {
      res.status(422).json({ error: "Admin Already Registered!" });
    } else if (password !== cpassword) {
      res
        .status(422)
        .json({ error: "Password and Confirm Password Not Matching!" });
    } else {
      const finalAdmin = new Admin({
        company,
        email,
        address,
        phone,
        website,
        password,
        cpassword,
      });

      // hashing the password
      const salt = await bcrypt.genSalt(10);
      finalAdmin.password = await bcrypt.hash(password, salt);
      finalAdmin.cpassword = await bcrypt.hash(cpassword, salt);
      const storeAdmin = await finalAdmin.save();
      sendVerifyMail(req.body.company, req.body.email, storeAdmin._id);
    }
    res.status(201).json({
      message:
        "Your Admin Account Created Successfully Please Verifiy Your Email!, Verification Link Sent To Your Mail",
    });
  } catch (error) {
    console.log(error);
    console.log("Catch Block Error While Registering Admin!");
  }
};

module.exports = adminRegister;
