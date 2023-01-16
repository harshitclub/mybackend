const User = require("../../models/userSchema");
const userVerify = async (req, res) => {
  try {
    const verifiedUser = await User.updateOne(
      { _id: req.query.id },
      { $set: { isVerified: true } }
    );
    res.send(`
      <html>
      <head>
      <style>
      body{
          background-color:#E5E4E2;
      }
      .adminVerifyOuter{
          display:flex;
          justify-content:center;
          align-items:center;
          width:100%;
          flex-direction:column;
      }
      .adminVerifyInner{
          background-color:#fff;
          width:60%;
          color:#000;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
      }
      </style>
      </head>
      <body>
      <div class="adminVerifyOuter">
      <h2>Verify Email Address</h2>
      <div class="adminVerifyInner">
      <h3>Your Email Address Has Been Verified</h3>
      <p>You Can Close This Window Now</p>
      </div>
      </div>
      </body>
      </html>
      `);
  } catch (error) {
    console.log(error);
  }
};

module.exports = userVerify;
