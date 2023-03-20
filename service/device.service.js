const { device, gpio, deviceData } = require('../db/db')


exports.all = async (e) => {
    let model = await device.findAll({ include: [{ model: gpio }, { model: deviceData }] })
    return model
}

exports.findById = async (e) => {
    let model = await device.findOne({ where: { id: Number(e.id) } })
    return model
}

exports.findDeviceWithGpio = async (e) => {
    try {
        let models = await device.findAll({ where: { user_id: Number(e.id) }, include: [{ model: gpio }, { model: deviceData }] },)
        return models

    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.findDevice = async (e) => {
    try {
        let models = await device.findAll({ where: { user_id: Number(e.id) }, include: [{ model: deviceData }] },)
        return models

    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.create = async (e) => {
    try {
        let deviceModel = await device.findOne({ where: { user_id: Number(e.user_id), device_id: e.device_id } })
        console.log('deviceModel>', deviceModel);
        if (deviceModel == null) {
            let model = await device.create({
                user_id: Number(e.user_id),
                device_id: e.device_id,
                name: e.name,
                status: true,
                online_status: false,
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
        let model = await device.findOne({ where: { id: Number(e.id) } })
        console.log('model>', model);
        if (model) {
            model.device_id = e.device_id
            model.name = e.name
            // model.status = e.status
            await model.save()
            return model
        }
        return null

    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.updateOnline = async (e) => {
    try {
        let model = await device.findOne({ where: { device_id: e.device_id } })
        if (model) {
            model.online_status = true
            await model.save()
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}

exports.updateOffline = async (e) => {
    try {
        let model = await device.findOne({ where: { device_id: e.device_id } })
        if (model) {
            model.online_status = false
            await model.save()
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}


exports.delete = async (e) => {
    try {
        let model = await device.findOne({ where: { id: e.id } })
        console.log('deleteDevice::model>', model);
        if (model) {
            await model.destroy()
            return true
        }
        return false

    } catch (error) {
        console.log(error)
        throw error
    }

}