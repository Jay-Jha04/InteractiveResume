const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    const { _id } = jwt.decode(token);
    const user = User.findById(_id);

    if (!user) {
      return res.status(401).send("Access denied");
    }

    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};
