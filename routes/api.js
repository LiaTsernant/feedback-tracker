const express = require("express");
const router = express.Router();
const getDataFromSpreadsheet = require('../getDataFromSpreadsheet');
const db = require('../models')

//api/v1/protected_routes

//Get information about all sheets
router.get('/update_database', (req, res) => {
  getDataFromSpreadsheet().then((data => {
    // console.log(data)
    db.Student.deleteMany({}, (err, result) => {
      if (err) {
        console.log(err);
        process.exit();
      };
      console.log(`Successfully deleted ${result.deletedCount} students.`);

      db.Student.create(data, (err, newStudents) => {
        if (err) {
          console.log(err);
          // process.exit();
        };
        let retStudents = [];
        for (let i = 0; i < newStudents.length; i += 1) {
          retStudents.push(`${newStudents[i].studentId}`);
        }
        res.json(retStudents)
      })
    })
  }));
});

module.exports = router;
