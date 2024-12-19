import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import { ObjectId } from "mongodb";
import Chat from "./models/chatModel.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());

connectDB();

app.use("/api/chats", chatRoutes);
app.use("/api/auth", authRoutes);

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = new Map();

io.on("connection", (socket) => {
  socket.on("registerUser", (userId) => {
    users.set(userId, socket.id); // Реєструємо користувача
  });

  socket.on("typing", (data) => {
    io.emit("typing", data);
  });

  socket.on("sendMessage", async (data) => {
    const { chatId, message } = data;

    io.emit("newMessage", {
      sender: message.sender,
      text: message.text,
      chatId: chatId,
    });
  });

  socket.on("disconnect", () => {
    users.forEach((value, key) => {
      if (value === socket.id) {
        users.delete(key);
      }
    });
  });
});
