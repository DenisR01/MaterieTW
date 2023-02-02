const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const DB_USERNAME = 'root';
const DB_PASSWORD = 'SabinTASEINFO';
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
});

class Device extends Sequelize.Model { };

Device.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.FLOAT,
    }
}, {
    sequelize,
    modelName: 'devices',
    timestamps: false
});

const app = express();
app.use(bodyParser.json());

app.get('/create', async (req, res) => {
    await sequelize.sync({ force: true });
    for (let i = 0; i < 10; i++) {
        await Device.create({ name: `Device-${i}`, price: `${Math.random() * 100 + i + 10}` });
    }
    res.status(201).json({ message: 'devices created' });
})

app.get('/device', async (req, res) => {
    const devices = await Device.findAll();
    res.status(200).send(devices);
})

app.post('/device', async (req, res) => {

    try {

        if (Object.keys(req.body).length === 0 || req.body.price < 0 || req.body.name.length < 4) {
            res.status(400).send({ message: "bad request" });
        }
        else {
            await Device.create(req.body);

            res.status(201).send({ message: "device created" });
        }

    } catch (ex) {
        console.log(ex);
    }
})

app.delete('/device/:id', async (req, res) => {

    try {
        const device = await Device.findByPk(req.params.id);

        if (device) {
            device.destroy();

            res.status(202).send({ message: "device deleted" });
        }

    }
    catch (ex) {
        console.log(ex);
    }

})

module.exports = app;