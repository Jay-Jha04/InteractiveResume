require("dotenv").config();

const configurations = {
  port: "3900",
  db: "mongodb://localhost:27017/resumedb01",
  secretKey: `${process.env.Interactive_Resume_secretKey}`,
};

exports.getDefaultConfiguration = function (key) {
  return configurations[key];
};

exports.hasDefaultConfiguration = function (key) {
  return configurations.hasOwnProperty(key);
};
