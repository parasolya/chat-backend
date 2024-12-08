import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import { Server } from 'socket.io'; // Коректний імпорт для socket.io
import connectDB from './config/db.js';
import chatRoutes from './routes/chatRoutes.js';
import { ObjectId } from 'mongodb'; // Додати цей імпорт для використання ObjectId

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000', // Клієнтський додаток, який має доступ
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Які методи можна використовувати
  allowedHeaders: ['Content-Type', 'Authorization'],  // Які заголовки можна використовувати
};

app.use(cors(corsOptions));

// Middleware для парсингу JSON
app.use(express.json());

// Підключення до бази даних
connectDB();

// Роут для чату
app.use('/api/chats', chatRoutes);


// Запуск сервера
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Socket.io для живих з'єднань
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Клієнтський додаток
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});