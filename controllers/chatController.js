import Chat from "../models/chatModel.js";
import getRandomQuote from "../utils/quoteFetcher.js";
import { ObjectId } from "mongodb";
import db from "../config/db.js";
import User from "../models/userModel.js";

export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find();
    res.json(chats);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving chats" });
  }
};

export const createChat = async (req, res, next) => {
  try {
    const owner = req.user._id; 
    const { userFirstName, userLastName, botFirstName, botLastName  } = req.body;
  
      let participantId = null;
  
     
      if (userFirstName && userLastName) {
        const user = await User.findOne({ firstName: userFirstName, lastName: userLastName });
        
        if (user) {
          participantId = user._id; 
        } else {
          
          return res.status(400).json({ error: 'User not found.' });
        }
      } 
     
      else if (botFirstName && botLastName) {
        const bot = await User.create({ 
          firstName: botFirstName, 
          lastName: botLastName,
          isBot: true 
        });
        participantId = bot._id; 
      } else {
        return res.status(400).json({ error: 'No user or bot data provided.' });
      }
  
      
      const participantsArray = [owner, participantId]; 
  
      const chat = await Chat.create({
        owner, 
        participants: participantsArray, 
      });
  
      return res.status(201).json({
        chat: {
          _id: chat._id,
          owner,
          participants: chat.participants,
          messages: chat.messages,
        },
      });
    } catch (error) {
      next(error);
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
    res.status(500).json({ message: "Error updating chat" });
  }
};

export const deleteChat = async (req, res) => {
  try {
    await Chat.findByIdAndDelete(req.params.id);
    res.send("Chat deleted");
  } catch (err) {
    res.status(500).json({ message: "Error deleting chat" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, message } = req.body;

    if (!chatId || !message) {
      return res
        .status(400)
        .json({ error: "Chat ID and message are required" });
    }

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const botReply = await getRandomQuote();

    const botMessage = {
      sender: `${chat.firstName} ${chat.lastName}`,
      text: botReply,
    };

    chat.messages.push(message, botMessage);
    chat.updatedAt = new Date();

    await chat.save();

    res.status(200).json({ botMessage });
  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
