import Joi from "joi";
import { emailRegex } from "../constants/userConstants.js";

const userSchemas = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string()
    .pattern(emailRegex)
    .required(),
  password: Joi.string().required(),
  status: Joi.string().valid("active", "notActive").default("active"),
});


export default userSchemas;