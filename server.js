const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");

const authRoutes = require("./routes/auth"); 
const chatRoutes = require("./routes/chat");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

// Socket.io for Real-Time Chat
io.on("connection", (socket) => {
    console.log("🔵 User connected");

    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`👤 User joined room: ${room}`);
    });

    socket.on("chatMessage", (data) => {
        io.to(data.room).emit("message", data);
        console.log(`💬 Message in ${data.room}: ${data.message}`);
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected");
    });
});

const PORT = process.env.PORT || 5003;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
