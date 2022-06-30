const mongoose = require("mongoose");
const Joi = require("joi");
const { experienceSchema } = require("./experience");
const { skillSchema } = require("./skill");

const Profile = mongoose.model(
  "profiles",
  new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    about_yourself: {
      type: String,
      trim: true,
      required: true,
      maxlength: 1000,
    },
    experiences: {
      type: [experienceSchema],
      required: true,
    },
    skills: {
      type: [skillSchema],
      required: true,
    },
    profile_image: {
      type: mongoose.Schema.Types.ObjectId,
    },
  })
);

const validateProfile = (profile) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    location: Joi.string().required(),
    about_yourself: Joi.string().max(1000).required(),
    experienceIds: Joi.array().items(Joi.objectId()).required(),
    skillIds: Joi.array().items(Joi.objectId()).required(),
    profile_image: Joi.objectId(),
  });

  return schema.validate(profile);
};

exports.Profile = Profile;
exports.validateProfile = validateProfile;
