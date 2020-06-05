const express = require("express");
const router = express.Router();

// Render Views
// router.get('/login', ctrl.views.login);
router.get('/profile', (req, res) => {
  res.sendFile('views/profile.html', {
    root: __dirname + '/../'
  });
});

router.get('/login', (req, res) => {
  res.sendFile('views/auth/login.html', {
    root: __dirname + '/../'
  });
});

router.get('/register', (req, res) => {
  res.sendFile('views/auth/register.html', {
    root: __dirname + '/../'
  });
});










// router.post('/api/v1/protected_route/login', ctrl.auth.login);
module.exports = router;
