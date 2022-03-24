const express = require('express');
var router = require('./router');

const app = express()
const port = 2900

app.use('/router', router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})