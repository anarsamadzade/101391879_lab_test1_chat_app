const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// Send a message
router.post("/send", async (req, res) => {
    try {
        const { from_user, room, message } = req.body;
        if (!from_user || !room || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newMessage = new Message({ from_user, room, message });
        await newMessage.save();
        res.status(201).json({ message: "Message sent successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get messages for a room
router.get("/:room", async (req, r
