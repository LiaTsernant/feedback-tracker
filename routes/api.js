const express = require("express");
const router = express.Router();
const doc = require('../spreadshet')

//api/v1/protected_routes

router.get('/doc', (req, res) => {
  res.sendStatus(200).json({ doc })
});

module.exports = router;
