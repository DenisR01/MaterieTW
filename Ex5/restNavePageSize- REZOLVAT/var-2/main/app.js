const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const mysql = require('mysql2/promise')

const DB_USERNAME = 'root'
const DB_PASSWORD = 'SabinTASEINFO'

let conn

mysql.createConnection({
    user: DB_USERNAME,
    password: DB_PASSWORD
})
    .then((connection) => {
        conn = connection
        return connection.query('CREATE DATABASE IF NOT EXISTS tw_exam')
    })
    .then(() => {
        return conn.end()
    })
    .catch((err) => {
        console.warn(err.stack)
    })

const sequelize = new Sequelize('tw_exam', DB_USERNAME, DB_PASSWORD, {
    dialect: 'mysql',
    logging: false
})

let Ship = sequelize.define('ship', {
    name: Sequelize.STRING,
    portOfSail: Sequelize.STRING,
    displacement: Sequelize.INTEGER
}, {
    timestamps: false
})


const app = express()

app.get('/create', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        for (let i = 0; i < 10; i++) {
            let ship = new Ship({
                name: `name${i}`,
                portOfSail: `port ${i}`,
                displacement: 3000 + 10 * i
            })
            await ship.save()
        }
        res.status(201).json({ message: 'created' })
    }
    catch (err) {
        console.warn(err.stack)
        res.status(500).json({ message: 'server error' })
    }
})

app.get('/ships', async (req, res) => {

    try {

        const pageNo = req.query.pageNo;
        const pageSize = req.query.pageSize;

        if ((pageNo === undefined && pageSize === undefined) || pageNo !== undefined && isNaN(Number(pageNo)) || pageSize !== undefined && isNaN(Number(pageSize))) {

            const ships = await Ship.findAll();
            res.status(200).json(ships);

        }
        else if (pageNo !== undefined && pageSize === undefined) {
            const ships = await Ship.findAll({ limit: 5, offset: Number(pageNo) * 5 });
            res.status(200).json(ships);
        }
        else if (pageNo !== undefined && pageSize !== undefined) {
            const shipsForLength = await Ship.findAll();

            if (Number(pageNo) > shipsForLength.length / Number(pageSize))
                res.status(400).send([]);
            else {
                const ships = await Ship.findAll({ limit: Number(pageSize), offset: Number(pageNo) * pageSize });
                res.status(200).json(ships);

            }
        }
    }
    catch (ex) {
        console.log(ex);
        res.status(500).json({ message: 'server error' });
    }
})

app.post('/ships', async (req, res) => {
    try {
        let ship = new Ship(req.body)
        await ship.save()
        res.status(201).json({ message: 'created' })
    }
    catch (err) {
        res.status(500).json({ message: 'server error' })
    }
})

module.exports = app