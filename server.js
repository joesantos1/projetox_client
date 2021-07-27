const express = require('express');
const path = require('path');
const serveStatic = require('serve-static')

var app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))

var port = process.env.PORT || 3000
app.listen(port)
console.log('Server started: ' + port);