import mongoose from "mongoose";
import { handleSaveError } from "./hooks";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Зв'язок із моделлю User
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

messageSchema.post("save", handleSaveError);

const Message = mongoose.model("Message", messageSchema);

export default Message;
