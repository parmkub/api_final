const express = require('express')
const auth = require("./middleware/auth");
const router = express.Router();

const deviceController = require('../controller/device.controller')
const gpioController = require('../controller/gpio.controller')

router.get('/', async function (req, res) {
    try {
        res.status(200).send({ result: true, data: { message: 'Hello World' } });
    } catch (error) {
        res.status(500).send(error);
        console.error(error)
    }
});

/* device */
router.get('/devices', auth, deviceController.all);

router.get('/devices/:id', auth, deviceController.findDevice);

router.get('/devices/gpio/:id', auth, deviceController.findDeviceWithGpio);

router.post('/device', auth, deviceController.create);

router.put('/device', auth, deviceController.update);

router.delete('/device', auth, deviceController.delete);

/* device gpio */
router.get('/gpios/:id', auth, gpioController.findByDevices);

router.post('/gpio', auth, gpioController.create);

router.put('/gpio', auth, gpioController.update);

router.delete('/gpio', auth, gpioController.delete);


module.exports = router