import bcrypt from "bcryptjs";

import User from "../models/userModel.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (user) {
    throw HttpError(409, "email in use")
  }
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
