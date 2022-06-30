const configurations = {
  port: "3900",
  db: "mongodb://localhost:27017/resumedb01",
};

exports.getDefaultConfiguration = function (key) {
  return configurations[key];
};

exports.hasDefaultConfiguration = function (key) {
  return configurations.hasOwnProperty(key);
};
