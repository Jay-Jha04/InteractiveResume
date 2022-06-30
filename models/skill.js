const mongoose = require("mongoose");
const Joi = require("joi");

const skillSchema = new mongoose.Schema({
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  experience: {
    type: String,
    required: true,
    trim: true,
  },
  framework: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "framework",
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "language",
  },
});

const Skill = mongoose.model("skills", skillSchema);

const validateSkill = (skill) => {
  const schema = Joi.object({
    rate: Joi.number().min(0).max(10).required(),
    experience: Joi.string().required(),
    frameworkId: Joi.objectId(),
    languageId: Joi.objectId(),
  });

  return schema.validate(skill);
};

exports.skillSchema = skillSchema;
exports.Skill = Skill;
exports.validateSkill = validateSkill;
