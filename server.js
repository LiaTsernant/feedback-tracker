require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const routes = require('./routes'); // Routes Module

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

app.use('/', routes.views);
app.use('/api/v1/protected_routes', routes.api);

// -------------------------------------------------------------------------
app.listen(PORT, () => console.log(`Project is listening at http:localhost:${PORT}`));