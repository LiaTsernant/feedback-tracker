const express = require("express");
const router = express.Router();
const doc = require('../spreadshet')

//api/v1/protected_routes

//Get information about all sheets
router.get('/doc', (req, res) => {
  doc.then((data => {
    res.json(data);
  }));
});

module.exports = router;
