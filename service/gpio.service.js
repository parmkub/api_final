const { gpio } = require('../db/db')

exports.findAllByUser = async (e) => {
    try {
        let models = await gpio.findAll({ where: { user_id: Number(e.id) } })
        return models
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.findByDevices = async (e) => {
    try {
        let models = await gpio.findAll({ where: { deviceId: Number(e.id) } })
        return models
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.create = async (e) => {
    try {
        let gpioModel = await gpio.findOne({ where: { deviceId: Number(e.deviceId), index: Number(e.index) } })
        console.log('gpioModel>', gpioModel);
        if (gpioModel == null) {
            let model = await gpio.create({
                user_id: Number(e.user_id),
                index: e.index,
                title: e.title,
                subTitle: e.subTitle,
                deviceId: e.deviceId,
                state: e.state,
                updateTimestamp: new Date()
            })
            return model
        }
        return null
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.update = async (e) => {
    try {
        let model = await gpio.findOne({ where: { id: Number(e.id) } })
        console.log('model>', model);
        if (model) {
            model.index = e.index
            model.title = e.title
            model.subTitle = e.subTitle
            await model.save()
            return model
        }
        return null
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.delete = async (e) => {
    try {
        let model = await gpio.findOne({ where: { id: e.id } })
        console.log('model>', model);
        if (model) {
            await model.destroy()
            return model
        }
        return null
    } catch (error) {
        console.log(error)
        throw error
    }
}