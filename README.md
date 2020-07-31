Feedback Tracker
================

#### Project created for General Assembly Academy in San Francisco, CA

![Main page](/assets/feedback.png)

What is Feedback Tracker
------------------------

For an optimization of providing feedback for students I designed and
implemented a project where students can see feedback on their progress,
homework completion and attendance statistic.

This tracker syncs with Google Spreadsheets throught Google Spreadsheets
API, updates data in database and display information about student\'s
attendance, homework completion and provides feedback from instructors.

Technologies Used
-----------------

-   MongoDB,
-   Express,
-   Nodejs,
-   JavaScript,
-   Google Spreadsheets API,
-   Google Developers Console,
-   HTML5,
-   CSS3,
-   Bootstrap

Code
----

This code was my big challenge and my big win. I figured out how to
access data in Google Spreadsheet and pass it down to my routes.

getDataFromSpreadsheet.js

``` {.javascript}
const { GoogleSpreadsheet } = require('google-spreadsheet');
require('dotenv').config();

async function getDataFromSpreadsheet() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_ID);
  await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_SHEETS_CLIENT_SECRET));
  await doc.loadInfo(); // loads document properties and worksheets
  let sheetsCount = doc.sheetsByIndex.length;
  let allSheetsData = [];

  for (let i = 0; i < sheetsCount; i += 1) {
    // Iteration over all giant sheets objects
  }

```

For the frontend part, I assigned ID for HTML elements to be the same as
keys of the student object for being able to dynamically render data on
the page.

profile.js

``` {.javascript}
function render() {
  for (let key in student) {
    let element;

    if (key.indexOf('hw') === 0 && student[key]) {
      //Check if it is a homework data
    } else {
      //html id of an element matches key of an object.  <-------------
      element = document.getElementById(key.toLowerCase());
      //Assignes value if this element exists <------------------------
      if (element) {
        element.textContent = `${student[key]}`
      };
    };
  };
```

Link
----

Test credentials:

-   Student ID: 123
-   Email: <test@test.com>
-   Course Title: SEI 12

[https://ga-feedback-tracker.herokuapp.com](https://ga-feedback-tracker.herokuapp.com)

Next Features:
--------------

-   Add surveys about the course
-   Create a game where new students can interact with photos of their
    classmates and know each other before the first day of the class.
