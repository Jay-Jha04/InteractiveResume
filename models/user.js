const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, username: this.username },
    config("secretKey")
  );
};

const User = mongoose.model("users", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().trim().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(user);
};

exports.validateUser = validateUser;
exports.User = User;
