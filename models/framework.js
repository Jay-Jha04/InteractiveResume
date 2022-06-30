const mongoose = require("mongoose");
const Joi = require("joi");

const frameworkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Framework = mongoose.model("frameworks", frameworkSchema);

const validateFramework = (framework) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(framework);
};

exports.frameworkSchema = frameworkSchema;
exports.validateFramework = validateFramework;
exports.Framework = Framework;
