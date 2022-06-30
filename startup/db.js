const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");

  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info(`Connected to ${db} ...`))
    .catch((error) =>
      console.error(
        `Getting error while connecting with database...=> ${error}`
      )
    );
};
