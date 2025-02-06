const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./User");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
   try {
       const { username, firstname, lastname, password } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);
       const newUser = new User({ username, firstname, lastname, password: hashedPassword });
       await newUser.save();
       res.status(201).json({ message: "User created successfully" });
   } catch (err) {
       res.status(400).json({ error: "Username already exists" });
   }
});

// Login Route
router.post("/login", async (req, res) => {
   try {
       const { username, password } = req.body;
       const user = await User.findOne({ username });

       if (!user || !(await bcrypt.compare(password, user.password))) {
           return res.status(401).json({ error: "Invalid credentials" });
       }

       const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
       res.json({ token });
   } catch (err) {
       res.status(500).json({ error: "Server error" });
   }
});

module.exports = router;
