const express = require("express");
const router = express.Router();
const routerWrapper = require("../middleware/routerWrapper");
const { validateProfile, Profile } = require("../models/profile");
const { mapViewToModel } = require("../models/maps/profile");
const authorization = require("../middleware/authorization");

router.get(
  "/",
  routerWrapper(async (req, res) => {
    const profile = await Profile.findOne();

    res.status(200).send(profile);
  })
);

router.put(
  "/:id",
  authorization,
  routerWrapper(async (req, res) => {
    const profile = mapViewToModel(req.body);
    const { error } = validateProfile(profile);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

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
