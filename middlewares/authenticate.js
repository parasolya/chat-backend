import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw HttpError(401, "user is not authorizated");
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      throw HttpError(401);
    }
    req.user = user;
    next();
  } catch {
    throw HttpError(401, "Invalid token");
  }
};

export default ctrlWrapper(authenticate);
