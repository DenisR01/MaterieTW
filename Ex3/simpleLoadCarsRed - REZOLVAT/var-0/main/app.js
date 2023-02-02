const express = require('express')

const app = express()
app.use(express.static('public'))

app.get('/cars', (req, res) => {
    res.status(200).json([{
        name: 'a',
        color: 'red'
    }, {
        name: 'b',
        color: 'blue'
    }])
})


app.get('/', (req, res) => {

    res.sendFile(__dirname.join('/public/index.html'));
})

module.exports = app