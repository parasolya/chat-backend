import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import "dotenv/config"

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    email: newUser.email,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "email or password invalid");
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  res.json({
    token,
  })
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};
