const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

async function getDataFromSpreadsheet() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
  // console.log()
  await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SHEETS_CLIENT_SECRET));
  await doc.loadInfo(); // loads document properties and worksheets
  let sheetsCount = doc.sheetsByIndex.length;
  let allSheetsData = [];

  // Iteration over all giant sheets objects
  for (let i = 0; i < sheetsCount; i += 1) {
    let rawSheet = doc.sheetsByIndex[i];

    const rows = await rawSheet.getRows().
      then((rowRes => {
        // console.log(rowRes)
        for (let j = 0; j < rowRes.length; j += 1) {
          let student = {
            courseTitle: doc.sheetsByIndex[i].title,
            name: rowRes[j]['Full Name'],
            email: rowRes[j].Email,
            studentId: rowRes[j].StudentId,
            absence: rowRes[j].Absence,
            deliverables: rowRes[j].Deliverables,
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
            hw1: rowRes[j]['HW1'],
            hw2: rowRes[j]['HW2'],
            hw3: rowRes[j]['HW3'],
            hw4: rowRes[j]['HW4'],
            hw5: rowRes[j]['HW5'],
            hw6: rowRes[j]['HW6'],
            hw7: rowRes[j]['HW7'],
            hw8: rowRes[j]['HW8'],
            hw9: rowRes[j]['HW9'],
            hw10: rowRes[j]['HW10'],
            hw11: rowRes[j]['HW11'],
            hw12: rowRes[j]['HW12'],
            hw13: rowRes[j]['HW13'],
            hw14: rowRes[j]['HW14'],
            hw15: rowRes[j]['HW15'],
            hw16: rowRes[j]['HW16'],
            hw17: rowRes[j]['HW17'],
            Outcomes1: rowRes[j]['Outcomes1'],
            Outcomes2: rowRes[j]['Outcomes2'],
            Outcomes3: rowRes[j]['Outcomes3'],
            Outcomes4: rowRes[j]['Outcomes4'],
            Outcomes5: rowRes[j]['Outcomes5'],
          };
          // console.log(student);
          allSheetsData.push(student);
        };
      }));
  };

  return allSheetsData;
};

module.exports = getDataFromSpreadsheet;