import Joi from "joi";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const validationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.empty": "This field cannot be left blank",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name cannot be longer than 30 characters",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.empty": "Email Address is required",
    "string.pattern.base": "Invalid Email Address",
  }),
  employeeId: Joi.string().min(4).required().messages({
    "string.empty": "This field cannot be left blank",
    "string.min": "Employee Id must be at least 4 characters long",
  }),
  mobileNumber: Joi.string()
    .pattern(new RegExp("^[6-9]\\d{9}$"))
    .required()
    .messages({
      "string.empty": "This field cannot be left blank",
      "string.pattern.base": "Please enter a valid phone number",
    }),
  role: Joi.string().required().messages({
    "string.empty": "This field cannot be left blank",
  }),
});
