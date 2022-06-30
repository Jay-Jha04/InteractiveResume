const express = require("express");
const skills = require("../routes/skills");
const languages = require("../routes/languages");
const frameworks = require("../routes/frameworks");
const experience = require("../routes/experiences");
const companies = require("../routes/companies");
const profiles = require("../routes/profiles");
const projects = require("../routes/projects");
const uploadImages = require("../routes/uploadImages");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use(skills);
  app.use(languages);
  app.use("/api/frameworks", frameworks);
  app.use("/api/experiences", experience);
  app.use(companies);
  app.use("/api/profiles", profiles);
  app.use("/api/projects", projects);
  app.use("/api/upload-images", uploadImages);
  app.use(error);
};
