const express = require("express");
const router = express.Router();
const routerWrapper = require("../middleware/routerWrapper");
const { validateProfile, Profile } = require("../models/profile");
const { mapViewToModel } = require("../models/maps/profile");

router.get(
  "/",
  routerWrapper(async (req, res) => {
    const profile = await Profile.findOne();

    res.status(200).send(profile);
  })
);

router.put(
  "/:id",
  routerWrapper(async (req, res) => {
    console.log(req.body);
    const profile = mapViewToModel(req.body);
    const { error } = validateProfile(profile);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    console.log(profile);
    const response = await Profile.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: { ...profile },
      },
      { new: true }
    );

    if (!response) {
      return res.status(500).send("An unknown error occurred");
    }

    return res.status(202).send(response);
  })
);

module.exports = router;
