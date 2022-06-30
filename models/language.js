const mongose = require("mongoose");
const Joi = require("joi");

const languageSchema = new mongose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Language = mongose.model("languages", languageSchema);

const validateLanguage = (language) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(language);
};

exports.languageSchema = languageSchema;
exports.validateLanguage = validateLanguage;
exports.Language = Language;
