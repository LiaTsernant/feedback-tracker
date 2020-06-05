const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const routes = require('./routes'); // Routes Module

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const url = req.url;
  const method = req.method;
  const requestedAt = new Date().toLocaleTimeString();
  const result = `${method} ${url} ${requestedAt}`;
  console.log(result);

  next();
});

app.use('/', routes.views);










// -------------------------------------------------------------------------
app.listen(PORT, () => console.log(`Project is listening at http:localhost:${PORT}`));