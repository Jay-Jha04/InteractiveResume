const express = require("express");
const authorization = require("../middleware/authorization");
const router = express.Router();
const routerWrapper = require("../middleware/routerWrapper");
const { Company } = require("../models/company");
const { validateExperience, Experience } = require("../models/experience");
const { mapViewToModel } = require("../models/maps/experience");
const { Profile } = require("../models/profile");

router.get(
  "/",
  routerWrapper(async (req, res) => {
    const experiences = await Experience.find();
    res.status(200).send(experiences);
  })
);

router.post(
  "/",
  authorization,
  routerWrapper(async (req, res) => {
    let experience = mapViewToModel(req.body);
    const { error } = validateExperience(experience);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let profile = await Profile.findOne();
    const company = await new Company({ ...experience.company }).save();

    if (!company) {
      return res.status(400).send("Invalid company...");
    }

    experience = new Experience({ ...experience, ["company"]: company });
    experience = await experience.save();

    if (!experience) {
      res.status(500).send("An unknown error occurred!");
    }

    profile["experiences"].push(experience);
    await profile.save();
    res.send(experience);
  })
);

module.exports = router;
