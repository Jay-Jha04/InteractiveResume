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
    trim: true,
  },
  start_date: {
    type: String,
    trim: true,
    required: true,
  },
  end_date: {
    type: String,
    trim: true,
    required: true,
  },
});

const Company = mongoose.model("companies", companySchema);

exports.Company = Company;
exports.companySchema = companySchema;
