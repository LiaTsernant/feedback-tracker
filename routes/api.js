const express = require("express");
const router = express.Router();
const doc = require('../spreadshet')

//api/v1/protected_routes

router.get('/doc', (req, res) => {
  doc.then((data => {
    let sheetsCount = data.sheetsByIndex.length
    let result = [];
    for (let i = 0; i < sheetsCount; i += 1) {
      let sheet = data.sheetsByIndex[i];
      let sheetObj = {
        title: sheet.title
      }

      result.push(sheetObj)
    }

    res.json(result);
  }));
});

module.exports = router;
