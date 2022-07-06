const express = require("express");
const skills = require("../routes/skills");
const experience = require("../routes/experiences");
const profiles = require("../routes/profiles");
const projects = require("../routes/projects");
const uploadImages = require("../routes/uploadImages");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/skills", skills);
  app.use("/api/experiences", experience);
  app.use("/api/profiles", profiles);
  app.use("/api/projects", projects);
  app.use("/api/upload-images", uploadImages);
  app.use(error);
};
