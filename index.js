const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const bodyparser = require("body-parser");
const connection = require("./db/database");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
app.use(express.json());

const PORT = process.env.PORT || 4000;

connection();
app.use(cors());
app.use(cookieParser());
// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server is Working Fine!");
});

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});

app.use(adminRoutes, userRoutes, courseRoutes);
