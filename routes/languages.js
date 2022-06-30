const express = require("express");
const router = express.Router();
const routerWrapper = require("../middleware/routerWrapper");
const { Language, validateLanguage } = require("../models/language");

router.get("/api/languages", (req, res) => {});

router.post(
  "/api/languages",
  routerWrapper(async (req, res) => {
    const { error } = validateLanguage(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const language = new Language({
      name: req.body.name,
    });

    await language.save();

    return res.send(language);
  })
);

module.exports = router;
