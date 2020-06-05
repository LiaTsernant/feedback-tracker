const { GoogleSpreadsheet } = require('google-spreadsheet');

// async function accessFirstSheet() {
//   const doc = new GoogleSpreadsheet('1CvttHrbkh-LtZtu-Xfa8zJ1sM2y9EaiBpFpngT7FoYs');
//   await doc.useServiceAccountAuth(require('./client_secret.json'));
//   await doc.loadInfo(); // loads document properties and worksheets
//   const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
//   const rows = await sheet.getRows(); // can pass in { limit, offset }
//   console.log(rows[1]['Full Name'])
// }

async function getDocWithSheets() {
  const doc = new GoogleSpreadsheet('1CvttHrbkh-LtZtu-Xfa8zJ1sM2y9EaiBpFpngT7FoYs');
  await doc.useServiceAccountAuth(require('./client_secret.json'));
  await doc.loadInfo(); // loads document properties and worksheets
  return doc
};

// const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
// const rows = await sheet.getRows(); // can pass in { limit, offset }
// console.log(rows)

// accessFirstSheet()
// getDocWithSheets()

module.exports = getDocWithSheets;