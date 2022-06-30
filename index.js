const express = require("express");
const config = require("./config/config");
const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/idValidation")();
require("./startup/prod")(app);

const port = process.env.PORT || config("port");
const server = app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = server;
