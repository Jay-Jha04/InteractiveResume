const express = require("express");
const router = express.Router();
const routerWrapper = require("../middleware/routerWrapper");
const { Company } = require("../models/company");
const { validateExperience, Experience } = require("../models/experience");
const { mapViewToModel } = require("../models/maps/experience");

router.get(
  "/",
  routerWrapper(async (req, res) => {
    const experiences = await Experience.find();
    res.status(200).send(experiences);
  })
);

router.post(
  "/",
  routerWrapper(async (req, res) => {
    let experience = mapViewToModel(req.body);
    const { error } = validateExperience(experience);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    
    const company = await new Company({ ...experience.company }).save();

    if (!company) {
      return res.status(400).send("Invalid company...");
    }

    experience = new Experience({ ...experience, ["company"]: company });
    await experience.save();
    res.send(experience);
  })
);

module.exports = router;
