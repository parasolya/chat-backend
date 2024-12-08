import Chat from '../models/chatModel.js';
import getRandomQuote from '../utils/quoteFetcher.js';
import { ObjectId } from 'mongodb';
import db from '../config/db.js';


export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving chats' });
  }
};


export const createChat = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const newChat = new Chat({ firstName, lastName, messages: [] });
    await newChat.save();
    res.json(newChat);
  } catch (err) {
    res.status(500).json({ message: 'Error creating chat' });
  }
};


export const updateChat = async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName },
      { new: true }
    );
    res.json(updatedChat);
  } catch (err) {
    res.status(500).json({ message: 'Error updating chat' });
  }
};


export const deleteChat = async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.send('Chat deleted');
  } catch (err) {
    res.status(500).json({ message: 'Error deleting chat' });
  }
};


export const sendMessage = async (req, res) => {
  try {
    const { chatId, message } = req.body;

    
    if (!chatId || !message) {
      return res.status(400).json({ error: 'Chat ID and message are required' });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Отримуємо цитату для авто-відповіді
    const botReply = await getRandomQuote();

    // Формуємо повідомлення бота
    const botMessage = { sender: 'Bot', text: botReply };

    // Додаємо нові повідомлення до чату
    chat.messages.push(message, botMessage);
    chat.updatedAt = new Date();

    // Зберігаємо оновлення
    await chat.save();

    res.status(200).json({ botMessage });
  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};