const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const app = express()
const api = require('./routes/api');
const user = require('./routes/user');
require("dotenv").config()
var mqtt = require('mqtt')
const DeviceService = require('./service/device.service')
const DeviceDataService = require('./service/device-data.service')

// var client = mqtt.connect('mqtt://167.71.223.60/:1883', {
//     username: 'test-01',
//     password: 'pwd01',
//     clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
//     will: {
//         topic: 'device/will',
//         payload: 'device disconnected',
//         qos: 0,
//         retain: false
//     }
// })

var client = mqtt.connect('mqtt://167.71.223.60/:1883', {
    username: 'training',
    password: '7315b750',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    will: {
        topic: 'device/will',
        payload: 'device disconnected',
        qos: 0,
        retain: false
    }
})

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use('/v1', user);
app.use('/v1', api);

let topics = ['device/+/notify', 'device/+/checkin', 'device/+/will']

client.on('connect', function () {
    console.log('mqtt client connected')
    for (let index = 0; index < topics.length; index++) {
        const topic = topics[index];
        console.log('subscribe: ', topic)
        client.subscribe(topic, function (err) {
            if (err) {
                console.log(err)
            }
        })
    }

})

client.on('message', async function (topic, message) {
    // message is Buffer
    try {
        console.log(topic, message.toString())
        let payload = JSON.parse(message.toString())
        if (payload.device_id) {
            // flutter/906629f7c630/notify
            // flutter/906629f7c630/checkin
            // flutter/906629f7c630/will
            // [flutter, 906629f7c630, will]

            let topics = topic.split('/');
            if (topics[2] === 'checkin') {
                console.log('online: ', payload)
                DeviceService.updateOnline(payload)
            }
            if (topics[2] === 'will') {
                console.log('offline: ', payload)
                DeviceService.updateOffline(payload)
            }
            if (topics[2] === 'notify') {
                DeviceDataService.createOrUpdate(payload)
            }
        }
    } catch (error) {
        console.error(error)
    }

})

module.exports = app;

