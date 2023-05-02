const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcryptjs = require("bcrypt");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Blog = require("./models/Blog");
const Comment = require("./models/Comment");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs/dist/bcrypt");
const app = express();
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/userphotos", express.static(__dirname + "/userphotos"));

const bcryptSalt = bcryptjs.genSaltSync(10);
const jwtSecret = "asdfe45we45w345wegw345werjktjwertkj";

mongoose.connect(process.env.MONGO_URL);

app.post("/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, name, password, userPhoto } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcryptjs.hashSync(password, bcryptSalt),
      photos: userPhoto,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

// for login purpose
app.post("/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
          name: userDoc.name,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Password doesn't match");
    }
  } else {
    res.json(null);
  }
});

// retrieving the user profile
// for user profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { email, name, _id, photos } = await User.findById(userData.id);
      res.json({ email, name, _id, photos });
    });
  } else {
    res.json(null);
  }
});

// FOR UPLOADING THE IMAGE OF THE USERS
const userPhotoMiddleware = multer({ dest: "userphotos" });
app.post(
  "/account/photos",
  userPhotoMiddleware.array("photos", 100),
  (req, res) => {
    const uploadFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadFiles.push(newPath.replace("userphotos/", ""));
    }
    res.json(uploadFiles);
  }
);

// FOR UPLOADING THE IMAGE OF BLOG
const photoMiddleware = multer({ dest: "uploads" });
app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uploadFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadFiles);
});

// FOR SAVE THE BLOG IN THE DATABASE;
app.post("/blogs", (req, res) => {
  const { token } = req.cookies;
  const { title, description, addedPhotos, summary } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const blogDoc = await Blog.create({
        owner: userData.id,
        title,
        description,
        photos: addedPhotos,
        summary: summary,
      });
      res.json(blogDoc);
    });
  }
});

// for posting comment section
app.post("/blog/:id/comment", (req, res) => {
  const { comment } = req.body;
  const { id } = req.params;
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const commentDoc = await Comment.create({
        comment,
        author: userData.id,
        blog: id,
      });
      res.json(commentDoc);
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.get("/blog/:id/comment", async (req, res) => {
  const { id } = req.params;
  const comments = await Comment.find({ blog: id }).sort({ createdAt: -1 });

  if (comments) {
    res.json(comments);
  } else {
    res.status(404).json({ error: "Comments not found" });
  }
});

// FOR LOGOUT THE USER
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// for retrieve all the blogs of all users
app.get("/blogs", async (req, res) => {
  res.json(
    await Blog.find().populate("owner", ["name"]).sort({ createdAt: -1 })
  );
});

app.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const blogDoc = await Blog.findById(id).populate("owner comment", ["name"]);

  if (blogDoc) {
    res.json(blogDoc);
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
});

app.get("/test", (req, res) => {
  res.json("PASS");
});

app.listen(4000);
