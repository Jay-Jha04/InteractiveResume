const mongoose = require("mongoose");
const Joi = require("joi");
const { companySchema } = require("./company");

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 100,
  },
  employement_type: {
    type: String,
    enum: [
      "Full-time",
      "Part-time",
      "Self-employed",
      "Freelance",
      "Internship",
      "Trainee",
    ],
    required: true,
  },
  profile_headline: {
    type: String,
    trim: true,
    required: true,
    maxlength: 40,
  },
  description: {
    type: String,
    trim: true,
    maxlenght: 1000,
  },
  company: {
    type: companySchema,
    required: true,
  },
});

const Experience = mongoose.model("experiences", experienceSchema);

const validateExperience = (experience) => {
  const schema = Joi.object({
    title: Joi.string().max(100).required(),
    employement_type: Joi.string().required(),
    profile_headline: Joi.string().max(40).required(),
    description: Joi.string().max(1000),
    companyId: Joi.objectId().required(),
  });

  return schema.validate(experience);
};

exports.experienceSchema = experienceSchema;
exports.Experience = Experience;
exports.validateExperience = validateExperience;
