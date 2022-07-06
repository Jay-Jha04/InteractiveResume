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
  type: {
    type: String,
    enum: ["language", "framework", "database"],
    required: true,
  },
  skill: {
    type: String,
    required: true,
    trim: true,
  },
});

const Skill = mongoose.model("skills", skillSchema);

const validateSkill = (skill) => {
  const schema = Joi.object({
    rate: Joi.number().min(0).max(10).required(),
    experience: Joi.string().required(),
    type: Joi.string().required(),
    skill: Joi.string().required(),
  });

  return schema.validate(skill);
};

exports.skillSchema = skillSchema;
exports.Skill = Skill;
exports.validateSkill = validateSkill;
