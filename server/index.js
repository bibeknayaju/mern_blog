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
const validator = require("validator");
const fs = require("fs");
const bodyParser = require("body-parser");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
});

const photoMiddleware = multer({ storage: storage });

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
  const { email, name, password, userPhoto, bio } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcryptjs.hashSync(password, bcryptSalt),
      photos: userPhoto,
      bio,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

// for login purpose
app.post("/login", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json("Email not available");
    }

    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return res.status(404).json("User not found");
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      return res.status(422).json("Password doesn't match");
    }

    jwt.sign(
      { email: userDoc.email, id: userDoc._id, name: userDoc.name },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(userDoc);
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
});

// retrieving the user profile
// for user profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { email, name, _id, photos, bio } = await User.findById(
        userData.id
      );
      res.json({ email, name, _id, photos, bio });
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

// for getting the account of specific user
app.get("/account/:id", async (req, res) => {
  const { id } = req.params;
  const userDoc = await User.findById(id).populate();

  if (userDoc) {
    res.json(userDoc);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// for updating the user's information not password
app.put("/account/edit/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, bio, name } = req.body;
    const { token } = req.cookies;

    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
          console.error(err);
          return res.sendStatus(403);
        }

        const query = { _id: id };
        const update = email ? { email, bio, name } : { bio, name };
        const options = { new: true };

        const updatedUser = await User.findOneAndUpdate(query, update, options);
        res.status(200).send(updatedUser);
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// for user's changing the password
app.put("/password/change/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;
    const { token } = req.cookies;

    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
          console.error(err);
          return res.sendStatus(403);
        }

        const user = await User.findById(id);
        if (!user) {
          return res.status(404).send("User not found");
        }

        // Check if old password matches login password
        const passOk = bcrypt.compareSync(oldPassword, user.password);

        if (!passOk) {
          return res.status(401).send("Invalid password");
        }

        const hashedPassword = bcrypt.hashSync(newPassword, bcryptSalt);
        user.password = hashedPassword;
        await user.save();

        res.sendStatus(200);
      });
    }
  } catch (err) {
    console.log("error hai ta guys", err);
  }
});

// FOR UPLOADING THE IMAGE OF BLOG
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
  const comments = await Comment.find({ blog: id })
    .populate("author")
    .sort({ createdAt: -1 });

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
    await Blog.find()
      .populate("owner", ["name", "photos"])
      .sort({ createdAt: -1 })
  );
});

// for getting the blog of specific user
app.get("/account/blog/:id", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    try {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const blogData = await Blog.find({ owner: userData.id });
        res.json(blogData);
      });
    } catch (err) {
      throw err;
    }
  } else {
    res.status(401).json({ message: "Missing token" });
  }
});

// for getting the specific blog with id
app.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const blogDoc = await Blog.findById(id).populate("owner comment", [
    "name",
    "photos",
  ]);

  if (blogDoc) {
    res.json(blogDoc);
  } else {
    res.status(404).json({ error: "Blog not found" });
  }
});

// for updating the blog
app.put(
  "/blog/:id",
  photoMiddleware.array("updatephotos", 100),
  async (req, res) => {
    let newPath;
    const newPaths = [];
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const newOne = path?.split("/");
        const parts = originalname.split(".");
        if (parts && parts.length > 1) {
          const ext = parts[parts?.length - 1];
          newPath = newOne.join("/") + "." + ext;
          fs.renameSync(path, newPath);
          newPaths.push(newPath.replace("/", ""));
        }
      }
    }

    const { token } = req.cookies;
    const { id } = req.params;

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { title, summary, description } = req.body;
      const blogDoc = await Blog.findById(id);
      const isOwner =
        JSON.stringify(blogDoc?.owner) === JSON.stringify(userData?.id);
      if (!isOwner) {
        return res.status(400).json("you are not the author");
      }

      let photos = blogDoc?.photos;

      if (newPath) {
        const splitPhoto = newPath.split("/");
        photos = splitPhoto[1];
      }

      const response = await blogDoc.updateOne({
        title,
        summary,
        description,
        photos: photos ? photos : blogDoc?.photos,
      });

      res.json(response);
    });
  }
);
// to delete the blog
app.delete("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;

  try {
    const userData = jwt.verify(token, jwtSecret);
    const blog = await Blog.findById(id);

    if (blog) {
      if (blog.owner.toString() === userData.id) {
        // Delete all comments related to the deleted blog post
        await Comment.deleteMany({ blog: blog._id });

        // Delete the blog post
        await Blog.findOneAndDelete({ owner: userData.id, _id: id });

        return res.json(true);
      } else {
        return res
          .status(401)
          .json({ error: "You are not authorized to delete this blog" });
      }
    } else {
      return res.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ error: "You are not authorized to perform this action" });
  }
});

app.get("/test", (req, res) => {
  res.json("PASS");
});

app.listen(4000);
