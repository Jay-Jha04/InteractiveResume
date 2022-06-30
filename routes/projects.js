const express = require("express");
const routerWrapper = require("../middleware/routerWrapper");
const { Framework } = require("../models/framework");
const { Language } = require("../models/language");
const { validateProject, Project } = require("../models/project");
const { Image } = require("../models/image");
const router = express.Router();
const { mapViewToModel } = require("../models/maps/project");

router.get(
  "/",
  routerWrapper(async (req, res) => {
    const projects = await Project.find();
    return res.send(projects);
  })
);

router.post(
  "/",
  routerWrapper(async (req, res) => {
    const projectModel = mapViewToModel(req.body);

    if (!projectModel) {
      return res.status(400).send("Invalid project details...");
    }

    const frameworks = await Framework.find()
      .where("_id")
      .in(req.body.Skills.techStack);
    const languages = await Language.find()
      .where("_id")
      .in(req.body.Skills.techStack);

    if (!frameworks && !languages) {
      return res.status(400).send("Invalid project details...");
    }

    projectModel["tech_stack"] = {
      frameworks: [...frameworks],
      languages: [...languages],
      databases: [],
    };

    const { error } = validateProject(projectModel);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const project = new Project(projectModel);

    await project.save();

    return res.send(project);
  })
);

module.exports = router;
