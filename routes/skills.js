const Joi = require("joi");
const express = require("express");
const router = express.Router();
const { Skill, validateSkill } = require("../models/skill");
const routerWrapper = require("../middleware/routerWrapper");
const { mapViewToModel } = require("../models/maps/skill");

router.get(
  "/",
  routerWrapper(async (req, res) => {
    const skills = await Skill.find();
    res.send(skills);
  })
);

router.get(
  "/:id",
  routerWrapper(async (req, res) => {
    const skill = await Skill.findById(req.params.id);
    res.send(skill);
  })
);

router.post(
  "/",
  routerWrapper(async (req, res) => {
    let skill = mapViewToModel(req.body);
    const { error } = validateSkill(skill);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    skill = new Skill(skill);
    await skill.save();

    return res.send(skill);
  })
);

module.exports = router;
