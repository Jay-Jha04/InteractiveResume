const bcrypt = require("bcrypt");

exports.compareHashed = async function (incoming, store) {
  return await bcrypt.compare(incoming, store);
};
