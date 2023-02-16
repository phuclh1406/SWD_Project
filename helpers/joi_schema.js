const DateExtension = require("@joi/date");
const Joi = require("joi");
const joi = Joi.extend(DateExtension);

//  const email = joi.string().pattern(new RegExp('gmail.com$')).required()
//  const password = joi.string().min(6).required()

const post_title = joi.string().required().messages({
  "string.empty": `post_title is not allowed to be empty`,
});
const description = joi.string().required().messages({
  "string.empty": `description is not allowed to be empty`,
});
const time_start = joi.date().format("YYYY-MM-DD").utc().messages({
  "date.format": `time_start must be in YYYY-MM-DD format`,
  "any.required": `time_start is a required field`,
});
const time_end = joi.date().format("YYYY-MM-DD").utc().messages({
  "date.format": `time_end must be in YYYY-MM-DD format`,
  "any.required": `time_end is a required field`,
});
const price = joi.number().required().messages({
  "number.base": `price must be a number`,
});
const post_id = joi.string().required();
const cate_id = joi.string().required();
const project_id = joi.string().required();
const major_id = joi.string().required();
const post_ids = joi.array().required();

//  const refreshToken = joi.string().required();

module.exports = {
  post_id,
  post_title,
  description,
  time_start,
  time_end,
  price,
  post_ids,
  cate_id,
  project_id,
  major_id,
};
