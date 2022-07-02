const express = require("express");
const router = express.Router();
const routerWrapper = require("../middleware/routerWrapper");
const { Company } = require("../models/company");
const { validateExperience, Experience } = require("../models/experience");

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
    const { error } = validateExperience(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const company = await req.body.company;

    if (!company) {
      return res.status(400).send("Invalid company...");
    }

    const experience = new Experience({
      title: req.body.title,
      employement_type: req.body.employement_type,
      profile_headline: req.body.profile_headline,
      description: req.body.description,
      company: {
        _id: company._id,
        name: company.name,
        location: company.location,
        start_date: company.start_date,
        end_date: company.end_date,
      },
    });

    await experience.save();

    res.send(experience);
  })
);

module.exports = router;
