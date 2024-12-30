import mongoose from "mongoose";
import { handleSaveError } from "./hooks.js";

const chatSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    // messages: [
    //   {
    //     type: String,
    //   },
    // ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

chatSchema.pre("save", function (next) {
  if (!this.participants.includes(this.owner)) {
    this.participants.push(this.owner);
  }
  next();
});

chatSchema.post("save", handleSaveError);

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
