const express = require("express");
const router = express.Router();
const routerWrapper = require("../middleware/routerWrapper");
const { validateProfile, Profile } = require("../models/profile");
const { Experience } = require("../models/experience");
const { Skill } = require("../models/skill");
const { Image } = require("../models/image");

router.get(
  "/",
  routerWrapper(async (req, res) => {
    const profile = await Profile.findOne();

    res.status(200).send(profile);
  })
);

router.post(
  "/",
  routerWrapper(async (req, res) => {
    const { error } = validateProfile(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const experiences = await Experience.find()
      .where("_id")
      .in(req.body.experienceIds);

    const skills = await Skill.find().where("_id").in(req.body.skillIds);
    const image = await Image.findById(req.body.profile_image);

    if (!experiences && !skills && !image) {
      return res.status(400).send("Invalid profile informations...");
    }

    const profile = new Profile({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      location: req.body.location,
      about_yourself: req.body.about_yourself,
      experiences,
      skills,
      profile_image: req.body.profile_image,
    });

    await profile.save();
    res.send(profile);
  })
);

module.exports = router;
