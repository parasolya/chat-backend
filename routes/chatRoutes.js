import express from 'express';
import { getChats, createChat, updateChat, deleteChat, sendMessage } from '../controllers/chatController.js';

const router = express.Router();

router.get('/', getChats);


router.post('/', createChat);


router.put('/:id', updateChat);


router.delete('/:id', deleteChat);


router.post('/messages', sendMessage);

export default router;