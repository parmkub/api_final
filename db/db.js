const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});
const UserModel = require('../model/user.model')(sequelize, DataTypes)
const DeviceModel = require('../model/device.model')(sequelize, DataTypes)
const DeviceDataModel = require('../model/device-data.model')(sequelize, DataTypes)
const GpioModel = require('../model/gpio.model')(sequelize, DataTypes)

DeviceModel.hasMany(GpioModel, { onDelete: 'CASCADE' })
GpioModel.belongsTo(DeviceModel)

DeviceModel.hasOne(DeviceDataModel, { onDelete: 'CASCADE' })
DeviceDataModel.belongsTo(DeviceModel)

sequelize.sync({ alter: false }).then(() => {
    console.log('sync table ok')
})

module.exports = {
    gpio: GpioModel,
    user: UserModel,
    device: DeviceModel,
    deviceData: DeviceDataModel
}