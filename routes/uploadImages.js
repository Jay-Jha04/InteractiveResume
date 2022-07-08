const express = require("express");
const router = express.Router();
const routerWrapper = require("../middleware/routerWrapper");
const ImageStorage = require("../middleware/setImageStorage");
const { Image } = require("../models/image");
const { Profile } = require("../models/profile");
const { Project } = require("../models/project");
const converToBase64 = require("../utils/convertToBase64");

router.get(
  "/:projectId",
  routerWrapper(async (req, res) => {
    const { project_images } = await Project.findById(
      req.params.projectId
    ).select("project_images");
    const images = await Image.find().where("_id").in(project_images);

    return res.send(images);
  })
);

router.get(
  "/profile-image/:id",
  routerWrapper(async (req, res) => {
    const image = await Image.findById(req.params.id);

    return res.send(image);
  })
);

router.post(
  "/",
  ImageStorage.array("images", 12),
  routerWrapper(async (req, res) => {
    const files = req.files;

    if (!files) {
      return res.status(400).send("Please choose files");
    }

    const images = files.map((file) => {
      const base64_image = converToBase64(file);
      const image = new Image({
        filename: file.originalname,
        contentType: file.mimetype,
        imageBase64: base64_image,
      });
      return image;
    });

    const imageIds = images.map((image) => {
      return image._id;
    });

    await Image.bulkSave(images);

    return res.status(200).send(imageIds);
  })
);

router.post(
  "/profile-image",
  ImageStorage.single("image"),
  routerWrapper(async (req, res) => {
    const file = req.file;

    if (!file) {
      return res.status(400).send("Please choose image");
    }

    const base64_image = converToBase64(file);
    const image = new Image({
      filename: file.originalname,
      contentType: file.mimetype,
      imageBase64: base64_image,
    });

    await image.save();

    return res.send(image);
  })
);

router.delete(
  "/profile-image/:id",
  routerWrapper(async (req, res) => {
    const response = await Image.deleteOne({ _id: req.params.id });

    if (!response["acknowledged"]) {
      return res.status(500).send("An unknown error occurred!");
    }

    return res.status(204).send("Deleted");
  })
);

module.exports = router;
