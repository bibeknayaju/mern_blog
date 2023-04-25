const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcryptjs = require("bcrypt");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs/dist/bcrypt");
const app = express();

app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

const bcryptSalt = bcryptjs.genSaltSync(10);
const jwtSecret = "fasefraw4r5r3wq45wdfgw34twdfg";

mongoose.connect(process.env.MONGO_URL);

app.post("/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, name, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcryptjs.hashSync(password, bcryptSalt),
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
    res.json("not found");
  }
});

// retrieving the user profile
// for user profile
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { email, name, _id } = await User.findById(userData.id);
      res.json({ email, name, _id });
    });
  } else {
    res.json(null);
  }
});

app.get("/test", (req, res) => {
  res.json("PASS");
});

app.listen(4000);
