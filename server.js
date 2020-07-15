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

app.get('/survey', (req, res) => {
  res.sendFile('views/feedbackForm.html', {
    root: __dirname
  });
});

app.get('/survey', (req, res) => {
  res.sendFile('views/feedbackForm.html', {
    root: __dirname
  });
});

// -------------------------------------------------------------------- GOOGLE SPREADSHEET CALL 
app.get('/api/v1/protected_routes/update_database', (req, res) => {
  getDataFromSpreadsheet().then((data => {
    db.Student.deleteMany({}, (err, result) => {
      if (err) {
        console.log(err);
        process.exit();
      };

      db.Student.create(data, (err, newStudents) => {
        if (err) {
          res.status(500).json({ status: "500", message: err });
        };
        res.status(200).json({ message : "OK"});
      });
    });
  }));
});

// ----------------------------------------------------------------------------- GET COURSE TITLES
app.get('/api/v1/protected_routes/get_course_titles', (req, res) => {
  //Find all students from the db
  db.Student.find({}).
    exec((err, foundStudents) => {
      if (err) {
        res.status(500).json({ status: "500", message: err });
      }
      if (!foundStudents) {
        return res.status(404).json({ status: 404, message: 'Cannot find course titles' });
      };

      //Created an object for filtering unique titles
      let titlesObj = {};
      for (let i = 0; i < foundStudents.length; i += 1) {
        titlesObj[foundStudents[i].courseTitle] = true;
      };

      //Created an array with unique titles
      let titlesArr = Object.keys(titlesObj)

      res.status(200).json({ status: 200, courseTitles: titlesArr });
    });
});

// ------------------------------------------------------------------------------------- AUTH 
//Mb change to db.Student.find({email: req.body.email, courseTitle: req.body.courseTitle}) ?
app.post('/api/v1/protected_routes/login', (req, res) => {
  db.Student.findOne({ email: req.body.email }, (err, foundStudent) => {
    if (err) {
      res.status(500).json({ status: "500", message: err });
    }

    if (!foundStudent) {
      return res.status(404).json({ status: 404, message: 'Cannot find a student by email' });
    };

    if (req.body.studentId === foundStudent.studentId && req.body.courseTitle === foundStudent.courseTitle) {
      res.status(200).json({ status: 200, student: foundStudent });
    } else {
      res.status(401).json({ status: 401, message: 'Something went wrong, please try again' });
    };
  });
});

app.get('/*', (req, res) => {
  res.sendFile('views/errorPage.html', {
    root: __dirname
  });
})

// -------------------------------------------------------------------------
app.listen(PORT, () => console.log(`Project is listening at http:localhost:${PORT}`));