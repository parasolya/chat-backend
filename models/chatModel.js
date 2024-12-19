import mongoose from "mongoose";
import { handleSaveError } from "./hooks.js";

const chatSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  messages: Array,
});



// const chatSchema = new mongoose.Schema(
//   {
//     participants: [
//       {
//         type: mongoose.Schema.Types.ObjectId, // Ідентифікатор користувача
//         ref: "User", // Зв'язок із моделлю User
//         required: true,
//       },
//     ],
//     messages: [
//       {
//         type: mongoose.Schema.Types.ObjectId, // Ідентифікатор повідомлення
//         ref: "Message", // Зв'язок із моделлю Message
//       },
//     ],
//     updatedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

chatSchema.post('save', handleSaveError )


const Chat = mongoose.model("Chat", chatSchema);

export default Chat;