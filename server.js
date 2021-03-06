const express = require('express');
const path = require('path');
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')

var app = express()

app.use(serveStatic(path.join(__dirname, 'dist')))
app.use(history({
    disableDotRule: true,
    verbose: true
  }));

app.route('/*').get(function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

var port = process.env.PORT || 3000
app.listen(port)
console.log('Server started: ' + port);