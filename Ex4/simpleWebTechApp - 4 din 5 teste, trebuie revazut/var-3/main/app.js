const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/data', (req, res) => {
    res.sendFile(__dirname + '/data.json');
})

module.exports = app;