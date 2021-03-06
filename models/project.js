const Joi = require("joi");
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  project_profile: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
  },
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 5000,
  },
  tech_stack: {
    type: [String],
    required: true,
  },
  project_images: {
    type: [mongoose.Schema.Types.ObjectId],
  },

  github_url: {
    type: String,
    required: true,
  },
  project_url: {
    type: String,
  },
});

const Project = mongoose.model("projects", projectSchema);

const validateProject = (project) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    project_profile: Joi.string().required().min(10).max(500),
    start_date: Joi.string().required(),
    end_date: Joi.string().required(),
    descriptions: Joi.string().required().min(10).max(5000),
    tech_stack: Joi.array().items(Joi.string()).min(2),
    project_images: Joi.array().items(Joi.objectId()),
    github_url: Joi.string().required(),
    project_url: Joi.string(),
  });
  return schema.validate(project);
};

exports.projectSchema = projectSchema;
exports.Project = Project;
exports.validateProject = validateProject;
