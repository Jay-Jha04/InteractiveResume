const configurations = {
  port: "3900",
  db: "mongodb://localhost:27017/resumedb01_test",
};

exports.getTestConfigurations = function (key) {
  return configurations[key];
};

exports.hasTestConfigurations = function (key) {
  return configurations.hasOwnProperty(key);
};
