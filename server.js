const multer = require("multer");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

require("dotenv").config();

const upload = multer({ dest: "uploads" });

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("HI");
});

app.listen(process.env.PORT, () => {
  console.log("Server started on port 3000");
});
