import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  messages: Array,
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;