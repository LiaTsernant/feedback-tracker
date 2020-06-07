require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const db = require('./models')
const getDataFromSpreadsheet = require('./getDataFromSpreadsheet')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//Custom logger from Kenny to see in the console what routes I am trying to access
app.use((req, res, next) => {
  const url = req.url;
  const method = req.method;
  const requestedAt = new Date().toLocaleTimeString();
  const result = `${method} ${url} ${requestedAt}`;
  console.log(result);
  next();
});

// ------------------------------------------------------------------------------------- VIEWS
app.get('/profile', (req, res) => {
  res.sendFile('views/profile.html', {
    root: __dirname
  });
});

app.get('/login', (req, res) => {
  res.sendFile('views/auth/login.html', {
    root: __dirname
  });
});

app.get('/', (req, res) => {
  res.redirect('/login')
});

app.get('/reports', (req, res) => {
  res.sendFile('views/reports.html', {
    root: __dirname
  });
});

// ------------------------------------------------------------------------------------- GOOGLE SPREADSHEET CALL 
app.get('/api/v1/protected_routes/update_database', (req, res) => {
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
        };
        let retStudents = [];
        for (let i = 0; i < newStudents.length; i += 1) {
          retStudents.push(`${newStudents[i].studentId}`);
        }
        res.json(retStudents);
      });
    });
  }));
});

// ------------------------------------------------------------------------------------- AUTH 
app.post('/api/v1/protected_routes/login', (req, res) => {
  db.Student.findOne({ email: req.body.email }, (err, foundStudent) => {
    if (err || !foundStudent) {
      return res.status(400).json({ status: 400, message: 'Cannot find student by email' });
    };

    if (req.body.studentId === foundStudent.studentId && req.body.courseTitle === foundStudent.courseTitle) {
      res.status(200).json({ status: 200, student: foundStudent });
    } else {
      res.status(401).json({ status: 401, message: 'Something went wrong, please try again' });
    };
  });
});

// -------------------------------------------------------------------------
app.listen(PORT, () => console.log(`Project is listening at http:localhost:${PORT}`));