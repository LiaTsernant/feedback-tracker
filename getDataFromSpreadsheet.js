const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

async function getDataFromSpreadsheet() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
  // console.log()
  await doc.useServiceAccountAuth(require('./client_secret.json'));
  await doc.loadInfo(); // loads document properties and worksheets
  let sheetsCount = doc.sheetsByIndex.length;
  let allSheetsData = [];

  // Iteration over all giant sheets objects
  for (let i = 0; i < sheetsCount; i += 1) {
    let rawSheet = doc.sheetsByIndex[i];

    const rows = await rawSheet.getRows().
      then((rowRes => {
        for (let j = 0; j < rowRes.length; j += 1) {
          let student = {
            courseTitle: doc.sheetsByIndex[i].title,
            name: rowRes[j]['Full Name'],
            email: rowRes[j].Email,
            studentId: rowRes[j].StudentId,
            absence: rowRes[j].Absence,
            late: rowRes[j].Late,
            Week1: rowRes[j].Week1,
            Week2: rowRes[j].Week2,
            Week3: rowRes[j].Week3,
            Week4: rowRes[j].Week4,
            Week5: rowRes[j].Week5,
            Week6: rowRes[j].Week6,
            Week7: rowRes[j].Week7,
            Week8: rowRes[j].Week8,
            Week9: rowRes[j].Week9,
            Week10: rowRes[j].Week10,
            Week11: rowRes[j].Week11,
            Week12: rowRes[j].Week12,
            hw1: rowRes[j]['HW 1'],
            hw2: rowRes[j]['HW 2'],
            hw3: rowRes[j]['HW 3'],
            hw4: rowRes[j]['HW 4'],
            hw5: rowRes[j]['HW 5'],
            hw6: rowRes[j]['HW 6'],
            hw7: rowRes[j]['HW 7'],
            hw8: rowRes[j]['HW 8'],
            hw9: rowRes[j]['HW 9'],
            hw10: rowRes[j]['HW 10'],
            project1: rowRes[j]['Project 1'],
            project2: rowRes[j]['Project 2'],
            project3: rowRes[j]['Project 3'],
          };

          // console.log(student);

          allSheetsData.push(student);
        };
      }));
  };

  return allSheetsData;
};

module.exports = getDataFromSpreadsheet;