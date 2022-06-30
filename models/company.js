const mongoose = require("mongoose");
const Joi = require("joi");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  end_date: {
    type: Date,
    default: null,
  },
});

const Company = mongoose.model("companies", companySchema);

const validateCompany = (company) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date(),
  });

  return schema.validate(company);
};

exports.Company = Company;
exports.validateCompany = validateCompany;
exports.companySchema = companySchema;
