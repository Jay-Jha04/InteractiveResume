//Uncomment while running application on production environment on local system
// require('dotenv').config();

const configurations = {
  port: "3900",
  db: "mongodb://localhost:27017/resumedb01_test",
  secretKey: `${process.env.Interactive_Resume_secretKey}`,
};

exports.getTestConfigurations = function (key) {
  return configurations[key];
};

exports.hasTestConfigurations = function (key) {
  return configurations.hasOwnProperty(key);
};
