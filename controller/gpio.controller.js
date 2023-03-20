const gpioService = require('../service/gpio.service')

exports.findAllByUser = async (req, res) => {
    try {
        console.log('params> ', req.params.id)
        let models = await gpioService.findAllByUser({ id: req.params.id })
        if (models) {
            res.status(200).send({ result: true, data: models });
        } else {
            res.status(500).send({ result: false, data: 'Not found' });
        }

    } catch (error) {
        res.status(500).send(error);
        console.log(error.fncName, error.err)
    }
}

exports.findByDevices = async (req, res) => {
    try {
        console.log('params> ', req.params.id)
        let models = await gpioService.findByDevices({ id: req.params.id })
        if (models) {
            res.status(200).send({ result: true, data: models });
        } else {
            res.status(500).send({ result: false, data: 'Not found' });
        }

    } catch (error) {
        res.status(500).send(error);
        console.log(error.fncName, error.err)
    }
}

exports.create = async (req, res) => {
    try {
        console.log('body>', req.body);
        try {
            let deviceModel = await gpioService.create(req.body)
            if (deviceModel == null) {
                res.status(400).send({ result: false, data: 'Bad request Duplicate index' });
            } else {
                res.status(201).send({ result: true, data: deviceModel });
            }

        } catch (error) {
            res.status(500).send({ result: false, data: error });
        }

    } catch (error) {
        res.status(500).send(error);
        console.log(error.fncName, error.err)

    }
}

exports.update = async (req, res) => {
    try {
        console.log('body>', req.body);
        var obj = req.body;
        let model = await gpioService.update(obj)
        console.log('model>', model);
        if (model) {
            res.status(200).send({ result: true, data: model });
        } else {
            res.status(400).send({ result: false, data: 'Bad Request Not found' });
        }

    } catch (error) {
        res.status(500).send(error);
        console.log(error.fncName, error.err)
    }
}

exports.delete = async (req, res) => {
    try {
        console.log('body>', req.body);
        let result = await gpioService.delete(req.body)
        console.log('result>', result);
        if (result) {
            res.status(200).send({ result: true, data: 'Success' });
        } else {
            res.status(400).send({ result: false, data: 'Bad Request Not found' });
        }

    } catch (error) {
        res.status(500).send(error);
        console.log(error.fncName, error.err)
    }
}