import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const signup = async (req, res) => {
  const { password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
