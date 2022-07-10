const express = require("express");
const routerWrapper = require("../middleware/routerWrapper");
const { validateUser, User } = require("../models/user");
const { compareHashed } = require("../utils/hashedString");
const router = express.Router();

router.post(
  "/",
  routerWrapper(async (req, res) => {
    const { error } = validateUser(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne()
      .where("username")
      .equals(req.body.username);

    if (!user) {
      return res.status(400).send("Invalid username or password");
    }

    const isValidPassword = await compareHashed(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(400).send("Invalid username or password");
    }

    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .status(200)
      .send("ok");
  })
);

module.exports = router;
