const express = require("express");
const router = express.Router();
const { Framework, validateFramework } = require("../models/framework");
const routerWrapper = require("../middleware/routerWrapper");

router.post(
  "/",
  routerWrapper(async (req, res) => {
    const { error } = validateFramework(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const framework = new Framework({
      name: req.body.name,
    });

    await framework.save();
    res.send(framework);
  })
);

module.exports = router;
