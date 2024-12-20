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

const userSignupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  email: Joi.string()
    .pattern(emailRegex)
    .required(),
  password: Joi.string().required(),
});

const userSigninSchema = Joi.object({
  email: Joi.string()
    .pattern(emailRegex)
    .required(),
  password: Joi.string().required(),
});


export default {
  userSignupSchema,
  userSigninSchema
};