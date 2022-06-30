const fs = require("fs");

module.exports = function base64_encode(file) {
  const bitmap = fs.readFileSync(file.path);
  return bitmap.toString("base64");
};
