import mongoose from "mongoose";

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

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;