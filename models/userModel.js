import mongoose from "mongoose";
import { emailRegex } from "../constants/userConstants.js";
import { handleSaveError } from "./hooks.js";
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    match: emailRegex,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "notActive"],
    default: "active",
  },
});

userSchema.post("save", handleSaveError);



const User = mongoose.model("user", userSchema);




export default User;
