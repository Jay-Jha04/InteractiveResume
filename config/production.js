//Uncomment while running application on production environment on local system
// require('dotenv').config();

const configurations = {
  db: `${process.env.Interactive_Resume_db}`,
  secretKey: `${process.env.Interactive_Resume_secretKey}`,
};

exports.getProductionConfigurations = function (key) {
  return configurations[key];
};

exports.hasProductionConfigurations = function (key) {
  return configurations.hasOwnProperty(key);
};
