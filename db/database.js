const mongoose = require("mongoose");

const MONGODBURL = process.env.MONGODBURL;

module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(MONGODBURL, connectionParams);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.log(error);
    console.log("MongoDB Could Not Connect!");
  }
};

mongoose.set("strictQuery", true);
