const { device, gpio, deviceData } = require('../db/db')



exports.createOrUpdate = async (e) => {
    let model = await device.findOne({ where: { device_id: e.device_id } })
    if (model) {
        let data = await deviceData.findOne({ where: { deviceId: model.id } })
        if (data) {
            data.temperature = e.temperature
            data.humidity = e.humidity
            data.light = e.light
            data.soil = e.soil
            await data.save();
            console.log('updated')
        } else {
            await deviceData.create({
                deviceId: model.id,
                temperature: e.temperature,
                humidity: e.humidity,
                light: e.light,
                soil: e.soil,
                updateTimestamp: new Date()
            })
        }
    }
}