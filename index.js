import dns from "dns";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";

import User from "./models/user.js";
import Profile from "./models/profile.js";
import educationRoutes from "./routes/educationRoutes.js"
import profileRoutes from "./routes/profileRoutes.js";
dns.setDefaultResultOrder("ipv4first");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/education",educationRoutes);

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// GET user by ID
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Profile route
// Get profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      userId: req.params.userId,
    });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }
    console.log(JSON.stringify(profile,null,2));

    res.json(profile);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Save profile
app.post("/profile", async (req, res) => {
  try {
    const { userId, bio, github, linkedin } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { userId },
      {
        $set: {
          bio,
          github,
          linkedin,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      message: "Profile saved successfully",
      profile,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
});
  

// Register
app.post("/register", async (req, res) => {
  const { name, email, role, workplace, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    role,
    workplace,
    password: hashedPassword,
  });

  await user.save();

  res.json({
    message: "Registered Successfully",
    user,
  });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: "Wrong password" });
  }

  res.json({
    message: "Login Successful",
    user,
  });
});

app.get("/search/:name", async (req, res) => {
  try {
    const users = await User.find({
      name: {
        $regex: req.params.name,
        $options: "i",
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

