const express = require('express')

const app = express()
const path = require('path')

app.get('/cars', (req, res) => {
    let filter = req.query.filter
    if (!filter) {
        res.status(200).json([{
            name: 'a',
            color: 'red'
        }, {
            name: 'b',
            color: 'blue'
        }])
    }
    else {
        res.status(200).json([{
            name: 'a',
            color: 'red'
        }, {
            name: 'b',
            color: 'blue'
        }].filter((e) => e.color === filter))
    }
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

module.exports = app