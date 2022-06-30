const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { Skill, validateSkill } = require("../models/skill");
const { Language } = require("../models/language");
const { Framework } = require("../models/framework");
const routerWrapper = require("../middleware/routerWrapper");

router.get(
  "/api/skills",
  routerWrapper(async (req, res) => {
    const skills = await Skill.find()
      .populate("language", "-__v", Language)
      .populate("framework", "-__v", Framework)
      .select("-__v");
    res.send(skills);
  })
);

router.get(
  "/api/skills/:id",
  routerWrapper(async (req, res) => {
    const skill = await Skill.findById(req.params.id);
    res.send(skill);
  })
);

router.post(
  "/api/skills",
  routerWrapper(async (req, res) => {
    const { error } = validateSkill(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const language = await Language.findById(req.body.languageId);
    const framework = await Framework.findById(req.body.frameworkId);

    if (!framework && !language) {
      return res.status(400).send("Invalid skills information...");
    }

    const skill = new Skill({
      rate: req.body.rate,
      experience: req.body.experience,
      framework: framework?._id,
      language: language?._id,
    });

    await skill.save();
    return res.send(skill);
  })
);

module.exports = router;
