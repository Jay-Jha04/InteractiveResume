const express = require("express");
const router = express.Router();
const routerWrapper = require("../middleware/routerWrapper");
const { validateCompany, Company } = require("../models/company");

router.post(
  "/api/companies",
  routerWrapper(async (req, res) => {
    const { error } = validateCompany(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const company = new Company({
      name: req.body.name,
      location: req.body.location,
      start_date: req.body.start_date,
      end_date: req.body.end_date ? req.body.end_date : null,
    });

    await company.save();

    res.send(company);
  })
);

module.exports = router;
