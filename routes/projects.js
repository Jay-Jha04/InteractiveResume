const express = require("express");
const routerWrapper = require("../middleware/routerWrapper");
const { validateProject, Project } = require("../models/project");
const router = express.Router();
const { mapViewToModel } = require("../models/maps/project");
const authorization = require("../middleware/authorization");

router.get(
  "/",
  routerWrapper(async (req, res) => {
    const projects = await Project.find();
    return res.send(projects);
  })
);

router.post(
  "/",
  authorization,
  routerWrapper(async (req, res) => {
    const projectModel = mapViewToModel(req.body);
    if (!projectModel) {
      return res.status(400).send("Invalid project details...");
    }

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
