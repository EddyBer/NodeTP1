const express = require('express');
var router = require('./router');

const app = express()

app.use('/router', router);
