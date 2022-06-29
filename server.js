const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true}))

const File = require("./models/File");

require("dotenv").config();

const upload = multer({ dest: "uploads" });

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  };
  if (req.body.password !== null && req.body.password !== "") {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }

  const file = await File.create(fileData);
  console.log(file);
  res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` });
});

app.get("/file/:id", async (req, res) => {
  const file = await File.findById(req.params.id);

    if (file.password !== null) {
        if (req.body.password === null) {
            res.render("password")
        }
    }

    // if () {
        
    // }

  file.downloadCount++;
  await file.save();
  res.download(file.path, file.originalName);
});

app.listen(process.env.PORT, () => {
  console.log("Server started on port 3000");
});
