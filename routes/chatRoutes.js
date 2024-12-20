import express from 'express';
import { getChats, createChat, updateChat, deleteChat, sendMessage } from '../controllers/chatController.js';
import authenticate from '../middlewares/authenticate.js';

const chatRouter = express.Router();

chatRouter.use(authenticate);

chatRouter.get('/', getChats);


chatRouter.post('/', createChat);


chatRouter.put('/:id', updateChat);


chatRouter.delete('/:id', deleteChat);


chatRouter.post('/messages', sendMessage);

export default chatRouter;